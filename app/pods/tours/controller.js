import Ember from 'ember';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Table from 'ember-light-table';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: ['gid'],
  gid: null,

  showTourDialog:false,
  tourStatusList: null,
  store: service(),
  session: service(),
  userId:null,

  page: 0,
  limit: 30,
  dir: 'desc',
  sort: 'uDate',

  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: [],
  meta: null,
  tour: null,

  columns: computed(function() {
    return [
    {
      label: 'Avatar',
      valuePath: 'pic',
      width: '40px',
      sortable: false,
      cellComponent: 'user-avatar'
    },
    {
      label: '',
      valuePath: 'tourIcon',
      cellComponent: 'table-t-i',
      sortable: false,
      width: '30px',
    },
    {
      label: 'Name',
      valuePath: 'name',
      sortable: false,
      width: '150px'
    },
    {
      label: 'Updated at ',
      valuePath: 'uDate',
      width: '150px',
      align:"center",
      sorted:true,
      format(value){
        return moment(value).format('MM/DD/YY, hh:mm:ss a');
      }
    },
    {
      label: 'Country',
      valuePath: 'country',

      format(value){
        return value ? value.toUpperCase():'';
      },
      align:"center"
    },
    ];
  }),

  //table: null,

  init() {
    Ember.Logger.info("------> init")
    this._super(...arguments);
    var userId = this.get('session.data.authenticated.userId');
    this.set('userId', userId);
    //Set de todos los status para lso filtros
    var tourStatusList = this.get('appConstants.tourStatusList').slice(1);
    tourStatusList.push("all");
    this.set('tourStatusList',tourStatusList);
  },
  setupQuery(params) {

    let gid = params['gid']
    Ember.Logger.info("--> Recibimos gid: ", gid);
    if(gid){
      this.set('selectedStatus','all');
      let gidInfo = this.get('store').findRecord('user', gid)
      this.set('selectedGid',gidInfo);
      // console.log("----> guide selected");
    }
    else {
      let currStatus = this.get('selectedStatus');
      if(Ember.isEmpty(currStatus)) {
        this.set('selectedStatus','pending');
      }
    }
    if(this.initializing) this.toggleProperty('initializing');
    else this.refreshQuery();
  },

  refreshQuery(){
    this.setProperties({
      //canLoadMore: true,
      page: 1
    });
    this.get('model').clear();
    this.get('fetchRecords').perform();
  },

  gidChanged: Ember.observer('gid', function(){ //Para que se soliciten los datos nuevamente al eliminar el gid
    this.refreshQuery();
  }),
  //Para los estatus
  selectedStatus:null, //default
  selectedGid:null, //default es el guia seleccionado


  fetchRecords: task(function*() {
    let qProp = {};
    let query = {};
    //Manejo de la páginación
    qProp.limit   = this.get('limit')
    qProp.offset  = (this.get('page') -1)* qProp.limit;
    qProp.sort    = (this.get('dir')=='asc'?'':'-').concat(this.get('sort') || 'uDate'); //colocamos valor por defecto del sort
    qProp.fields  = "tourIcon,country,uDate,flags,pictures,nameT,status,uid"

    let selectedStatus = this.get('selectedStatus')
    if (selectedStatus!='all') query["status"] = selectedStatus;

    let gid = this.get('userId'); //El guía es el usuario
    if (gid) query["uid"] = gid;
    qProp.q  = JSON.stringify(query);

    let records = yield this.get('store').query('tour',qProp);
    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  actions: {
    addTour(){
      var tour = this.get('store').createRecord('tour', {});
      this.set('tour', tour)
      this.set('showTourDialog',true);

    },
    resetModal(){
      Ember.Logger.debug("-->Close Modal")
      this.get('tour').unloadRecord();
      this.get('model').clear()
      this.setProperties({
        page: 1
      });
      this.get('fetchRecords').perform();
      this.set('showTourDialog',false);

    },
    statusChange(val){
      this.set('selectedStatus',val);
      this.refreshQuery();
    },

    removeGuide(){
      this.set('gid',null);
    },

    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.get('fetchRecords').perform();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          canLoadMore: true,
          page: 0
        });
        this.get('model').clear();
      }
    },

    onRowClick(row){
      this.send('tourSelected', row.content.id);
    },

    validityChange(isValid, isTouched, isInvalidAndTouched) {
      this.set('isInvalid', isInvalidAndTouched);
    }

  },
  table: computed('model', function() {
   return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  })
});

import Ember from 'ember';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Table from 'ember-light-table';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: ['gid','tid','ttid'],
  gid  :null,
  tid  :null,
  ttid :null,

  bookingStatusList: null,
  store: service(),
  session: service(),
  userId:null,

  page: 0,
  limit: 30,
  dir: 'desc',
  sort: 'scheduled',

  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: [],
  meta: null,

  columns: computed(function() {
    return [
    {
      label: 'Status',
      valuePath: 'status',
      sortable: true,
      width: '100px',
      format(value){
        return value.capitalize();
      }      
    },
    {
      label: 'Reason',
      valuePath: 'attentionReason',
      sortable: true,
      width: '150px',
      format(value){
        if (value) return value.capitalize();
      }      
    },        
    {
      label: 'Type',
      valuePath: 'btype',
      sortable: true,
      width: '50px',
      format(value){
        return value.capitalize();
      }

    },
    {
      label: 'Scheduled',
      valuePath: 'scheduled',
      width: '150px',
      align:"center",
      sorted:true,
      format(value){
        if(value) return moment(value).format('MM/DD/YY, hh:mm:ss a');
        else return "-----------------------------"
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

  init() {
    this.toggleProperty('initializing');
    this._super(...arguments);
    //Set de todos los status para lso filtros
    var userId = this.get('session.data.authenticated.userId');
    this.set('userId', userId);    
    var bookingsFilters=['Pending', 'In Progress', 'Upcoming', 'History'];
    this.set('bookingStatusList',bookingsFilters);
  },

  //Para los estatus
  setupQuery(params) {
    let gid = params['gid']
    let tid = params['tid']
    let ttid = params['ttid']
    if(gid){
      this.set('selectedStatus','History');
      let gidInfo = this.get('store').findRecord('user', gid)
      this.set('selectedGid',gidInfo);
    } 
    if(tid){
      this.set('selectedStatus','History');
      let tidInfo = this.get('store').findRecord('user', tid)
      this.set('selectedTid',tidInfo);
    } 
    if(ttid){
      this.set('selectedStatus','History');
      let ttidInfo = this.get('store').findRecord('tour', ttid)
      this.set('selectedTour',ttidInfo);
    }     

    if(!(gid||tid||ttid)) {
      let currStatus = this.get('selectedStatus');
      
      if(Ember.isEmpty(currStatus)) {
        this.set('selectedStatus','Pending');
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
  tidChanged: Ember.observer('tid', function(){ //Para que se soliciten los datos nuevamente al eliminar el gid
    this.refreshQuery();
  }),
  ttidChanged: Ember.observer('ttid', function(){ //Para que se soliciten los datos nuevamente al eliminar el gid
    this.refreshQuery();
  }),    
  selectedStatus:null, //default
  selectedGid:null, //default es el guia seleccionado
  selectedTid:null,
  selectedTour:null,

  fetchRecords: task(function*() {
    let qProp = {};
    let query = {};
    let model = ''
    let gid  = this.get('userId'); //this.get('gid');
    let tid  = this.get('tid');
    let ttid = this.get('ttid');
    //Manejo de la páginación
    qProp.limit   = this.get('limit')
    qProp.offset  = (this.get('page') -1)* qProp.limit;
    qProp.sort    = (this.get('dir')=='asc'?'':'-').concat(this.get('sort') || 'scheduled'); //colocamos valor por defecto del sort
    //qProp.fields  = "tourIcon,country,uDate,flags,pictures,nameT,status,uid"
    if (gid) query['gid']=gid;
    if (tid) query['uid']=tid;
    if (ttid) query['tid']=ttid;
  
    let selectedStatus = this.get('selectedStatus')
    switch (selectedStatus) {
      case 'Pending':
        model = 'booking-history'
        query["attention"]=true;
        break;
      case 'In Progress':
        model = 'booking'
        query["$or"]=[
          {"status":"inProgress"},
          {"status":"accepted","btype":"instant"}
        ];        
        break;
      case 'Upcoming':
        model = 'booking'
        query["status"]="accepted"; 
        query["btype"]={"$ne":"instant"}
        break;
      case 'History':
        model = 'booking-history'
        break;                        
      default:
        // statements_def
        break;
    }
    qProp.q  = JSON.stringify(query);

    let records = yield this.get('store').query(model,qProp);
    this.get('model').pushObjects(records.toArray());
    Ember.Logger.info("ret", records.toArray());
    //this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  actions: {
    statusChange(val){
      this.set('selectedStatus',val);
      this.refreshQuery();
    },

    removeGuide(){
      this.set('gid',null);
    },   
    removeTourist(){
      this.set('tid',null);
    },
    removeTour(){
      this.set('ttid',null);
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
      this.send('bookingSelected', row.content.id);
    },    
  },  
  table: computed('model', function() {
   return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  })     
});

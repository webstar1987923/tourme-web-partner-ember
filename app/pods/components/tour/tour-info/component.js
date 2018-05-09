import Ember from 'ember';


export default Ember.Component.extend({
  cover:null,
  alertNoTypes:false, //toast de alerta por si no seleccionamos ningún tipo
  showEditDialog:false,
  milliseconds:new Date().getTime(),
  dataUtils: Ember.inject.service('dataUtils'),
  amount:Ember.computed('model.cost', function(){
    return this.get('dataUtils.transform').amount(this.get('model.cost'));
  }),
  duration:Ember.computed('model.duration', function(){
    return this.get('dataUtils.transform').minToHours(this.get('model.duration'));
  }),
  firstAvailableHour:Ember.computed('model.startTime.first', function(){
    let tour = this.get('model');
    // let hour = tour.startTime && tour.startTime.first ? tour.startTime.first : "0800";
    // return this.get('dataUtils.transform').convert12HourFormat(hour)
    return tour.startTime && tour.startTime.first != undefined ? this.get('dataUtils.transform').convert12HourFormat(tour.startTime.first) :null;
  }),
  lastAvailableHour:Ember.computed('model.startTime.last', function(){
    let tour = this.get('model');
    // let hour = tour.startTime && tour.startTime.last ? tour.startTime.last : "1900";
    // return this.get('dataUtils.transform').convert12HourFormat(hour)
    return tour.startTime && tour.startTime.last != undefined ? this.get('dataUtils.transform').convert12HourFormat(tour.startTime.last) :null;
  }),
  availableStartTime:Ember.computed('model.startTime','firstAvailableHour','lastAvailableHour', function(){
    let tour = this.get('model');
    let resp = null;
    if ( tour.startTime && tour.startTime.first !== undefined && tour.startTime.last !== undefined ) {
      resp = `From ${this.get('firstAvailableHour')} to ${this.get('lastAvailableHour')}`;
    } else if (tour.startTime && tour.startTime.first !== undefined ) {
      resp = `Only at ${this.get('firstAvailableHour')}`;
    } else {
      // resp = `From ${this.get('firstAvailableHour')} to ${this.get('lastAvailableHour')}`;
      resp = `Not Available (Default: From ${this.get('dataUtils.transform').convert12HourFormat("0800")} to ${this.get('dataUtils.transform').convert12HourFormat("1900")}`;
    }
    return resp;
  }),
  //TODO estudiar este caso a ver por qué necesitamos pasar el changeAttr, si no lo pasamos el
  //computed se dispara cuando quitamos elementos del array pero no cuando añadimos
  tourTypes:Ember.computed('model.tourTypes','changeAttr', function(){
    let i18n = this.get('i18n');
    var resp = [];
    if ( this.get('model.tourTypes') ) {
      resp = this.get('model.tourTypes').reduce(function(clean, row){
        clean.push(i18n.t(`tt_${row}`));
        return  clean;
      }, [])
    }
    return resp;
  }),

  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),

  actions:{
    showAlertNoTypes(show){
      this.set('alertNoTypes', show);
    },
    setStartTime(field, time){
      var startTime = Ember.Object.create(this.get('model.startTime') || {});
      startTime.set(field, this.get('dataUtils.transform').convertTo24Hour(time));
      Ember.set(this.get('model'), 'startTime', startTime);
    },
    showEditTour(){
      this.set('showEditDialog',true);
    },
    cancelEditTour(){
      this.set('showEditDialog',false);
      this.sendAction('cancel');
    },
    editTour(){
      if ( !this.get('model.tourTypes').length ) {
        this.send('showAlertNoTypes', true);
      } else {
        this.sendAction('save',['tourTypes','extraCost','cost','duration','endurance','capacity','flags','startTime']);
      }
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  showEditDialog:false,
  dataUtils: Ember.inject.service('dataUtils'),
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  weekdays:Ember.computed('interviewCalendar', function(){
    moment().isoWeekday(1);
    let dow = this.get('interviewCalendar').dow || [];
    return moment.weekdays().map(function(wd, index){
      let iso = index+1;
      return {
        n:moment.weekdays(iso),
        iso:iso,
        short:moment.weekdaysMin(iso),
        available:dow.indexOf(iso) != -1
      }
    });
  }),
  firstAvailableHour:Ember.computed('interviewCalendar.start', function(){
    let interviewCalendar = this.get('interviewCalendar');
    return interviewCalendar.start != undefined ? this.get('dataUtils.transform').convert12HourFormat(interviewCalendar.start) :null;
  }),
  lastAvailableHour:Ember.computed('interviewCalendar.end', function(){
    let interviewCalendar = this.get('interviewCalendar');
    return interviewCalendar.end != undefined ? this.get('dataUtils.transform').convert12HourFormat(interviewCalendar.end) :null;
  }),
  availableTime:Ember.computed('interviewCalendar.start','interviewCalendar.end', function(){
    let interviewCalendar = this.get('interviewCalendar');
    let resp = "Not Available";
    if ( interviewCalendar.start !== undefined && interviewCalendar.end !== undefined ) {
      resp = `From ${this.get('firstAvailableHour')} to ${this.get('lastAvailableHour')}`;
    }
    return resp;
  }),

  actions:{
    changeAvailableDay(day){
      Ember.set(day, 'available',!day.available);
    },
    setTime(field, time){
      Ember.set(this.get('interviewCalendar'), field, this.get('dataUtils.transform').convertTo24Hour(time));
    },
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) this.sendAction('cancel');
    },
    editAvailable(){
      let calendar = {
        start:this.get('interviewCalendar').start,
        end:this.get('interviewCalendar').end,
        dow:this.get('weekdays').reduce(function(clean, row){
          if ( row.available ) clean.push(row.iso); 
          return  clean;
        }, [])
      }
      this.sendAction('saveCalendar',calendar);
    },
  }
});

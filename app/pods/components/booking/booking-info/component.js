import Ember from 'ember';

export default Ember.Component.extend({
  dataUtils: Ember.inject.service('dataUtils'),
  start: Ember.computed('model.start', function(){
    return this.get('model').start ? moment(this.get('model').start).format('MM/DD/YY, hh:mm:ss a') : "Tour hasn't started";
  }),
  end: Ember.computed('model.end', function(){
    return this.get('model').end ? moment(this.get('model').end).format('MM/DD/YY, hh:mm:ss a') : "Tour hasn't finished";
  }),
  scheduled: Ember.computed('model.scheduled', function(){
    return this.get('model').scheduled ? moment(this.get('model').scheduled).format('MM/DD/YY, hh:mm:ss a') : "No Scheduled";
  }),
  bookingDate: Ember.computed('model.cDate', function(){
    return moment(this.get('model').cDate).format('MM/DD/YY, hh:mm:ss a');
  }),
});

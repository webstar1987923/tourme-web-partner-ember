import Ember from 'ember';

export default Ember.Route.extend({
  toolBar     :Ember.inject.service(),

  beforeModel(transition){
    let gid = transition.queryParams['gid'];
    let tid = transition.queryParams['tid'];
    let ttid = transition.queryParams['ttid'];
    this.get('toolBar').set('statusBack', false); 
    if(gid||tid||ttid){
      this.get('toolBar').set('statusBack', true); 
    }
    this.controllerFor('bookings').setupQuery(transition.queryParams); 
  },
  actions:{
    bookingSelected(id){
      this.transitionTo('booking', id);
    }
  }
});
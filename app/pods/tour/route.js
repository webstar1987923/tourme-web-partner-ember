import Ember from 'ember';

export default Ember.Route.extend({
  toolBar     :Ember.inject.service(),
  activate() {
    this.get('toolBar').set('statusBack', true); 
    //this.controllerFor('tour').set('isDisabled', true)    
  },   
  model(params) {
    return Ember.RSVP.hash({
      details: this.get('remote').tour.details(params.id),
    });
  },   
  setupController(controller, models) {
    controller.set('model', models.details.model);
    controller.set('pictures', models.details.pictures);
    controller.set('numBookings', models.details.bookingsCount);
    controller.set('numTourists', 0); //TODO ver como coger esto
  },
  actions: {
    refresh(){
      this.refresh();
    }
  }
});
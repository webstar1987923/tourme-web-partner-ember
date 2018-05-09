import Ember from 'ember';

export default Ember.Route.extend({
  toolBar     :Ember.inject.service(),
  beforeModel(){
  //  if (!this.a2Acl.check('booking.allowed')) {
  //     this.toast.error('Sorry, you are not allowed to enter this route.');
  //     transition.abort();
  //     return;
  //   }
  },
  activate() {
    this.get('toolBar').set('statusBack', true);
    //this.controllerFor('booking').set('isDisabled', true)
  },
  model(params) {
    return this.get('remote').booking.details(params.id);
  },
  actions: {
    refresh(){
      this.refresh();
    }
  }
});
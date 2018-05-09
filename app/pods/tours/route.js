import Ember from 'ember';

export default Ember.Route.extend({
  toolBar     :Ember.inject.service(),
 
  beforeModel(transition){
     // Ember.Logger.info("before model", transition)
    let gid = transition.queryParams['gid'];
    this.get('toolBar').set('statusBack', false); 
    if(gid){
      this.get('toolBar').set('statusBack', true); 
    }
    this.controllerFor('tours').setupQuery(transition.queryParams);

  },  
  actions:{
    tourSelected(id){
      Ember.Logger.info('tourSelected-route', id)
      this.transitionTo('tour', id);
    }
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  //toolBar     :Ember.inject.service(),
  activate() {
    //this.get('toolBar').set('statusBack', true); 
    this.controllerFor('guide').set('isDisabled', true)
    this.controllerFor('guide').set('interview', null);
    this.controllerFor('guide').set('model', null);
    this.controllerFor('guide').set('guidePictures', null);
    this.controllerFor('guide').set('numTours', 0);
    this.controllerFor('guide').set('numBookings', 0);
    this.controllerFor('guide').set('numMessages', 0);
    this.controllerFor('guide').set('numRatings', 0);
  },   
  // model(params) {
  //   var id = params.guide_id;
  //   this.controllerFor('guide').getData(id);
  //   //return this.get('store').query('user',{'_id':id})
  //   return this.get('store').findRecord('user', id);  
  // },   
  model(params) {
    var id = params.guide_id;
    return Ember.RSVP.hash({
      model: this.get('store').findRecord('user', id),
      details: this.get('remote').guide.details(id),
      interviews: this.get('store').query('interview',{'gid':id})
    });
  },   
  setupController(controller, models) {
    if ( !Ember.isNone(models.model) ) {
      controller.set('model', models.model);
    }
    if ( !Ember.isNone(models.details) ) {
      controller.set('guidePictures', models.details.pictures);
      controller.set('numTours', models.details.toursCount);
      controller.set('numBookings', models.details.bookingsCount);
      controller.set('numMessages', models.details.messagesCount);
      controller.set('numRatings', models.details.ratingsCount);
    }
    if ( !Ember.isEmpty(models.interviews) ) {
      controller.set('interview', models.interviews.get('firstObject'));
    }
  },

  actions: {
    reloadModel: function(){
      this.modelFor('guide').model.reload();
      // this.refresh();
    }
  }
});

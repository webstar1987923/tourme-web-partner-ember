import Ember from 'ember';

export default Ember.Component.extend({
  showEditDialog:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  actions:{
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) {
        this.sendAction('cancel');
      } 
    },
    editGuide(){
      this.sendAction('save',['guideInfo.vehicle.make','guideInfo.vehicle.model','guideInfo.vehicle.year','guideInfo.hasVehicle']);
    },
  }
});

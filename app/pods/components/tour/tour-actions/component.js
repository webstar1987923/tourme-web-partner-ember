import Ember from 'ember';

export default Ember.Component.extend({
  alertCancel:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('alertCancel',false);
  }),
  actions:{
    showAlertCancel(show){
      this.set('alertCancel', show);
    },
    changeStatus(status){
      Ember.set(this.get('model'),'status', status);
      this.sendAction('save' ,['status']);
    }
  }
});

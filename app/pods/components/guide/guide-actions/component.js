import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    changeStatusApproved(status){
      Ember.set(this.get('model'),'guideInfo.approved', status);
      this.sendAction('save',['guideInfo.approved']);
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    closeMessageModal(){
      this.get('onClose')();
    },
    sendNewMessage(){
      this.get('onSend')();
    }
  }
});

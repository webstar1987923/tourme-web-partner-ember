import Ember from 'ember';

export default Ember.Component.extend({
  cover:null,
  showEditDialog:false,
  showNewMessage:false,
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),

  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  
  actions:{
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) this.sendAction('cancel');
    },
    editTourist(){
      this.sendAction('save',['firstName', 'lastName', 'backInfo.profile']);
    },
    showMessageModal(show){
      this.set('showNewMessage', show);
      if ( !show ) {
        this.set('replyMessageMsg',null);
        this.set('replyMessageTitle',null);
      }
    },
    updateBackInfoProfile(l){
      Ember.set(this.get('model'), 'backInfo.profile', l.value);
    },
    sendNewMessage(){
      let resolve = {
        success:false,
        error:false
      }
      Ember.addObserver(resolve, 'success', ()=>{
        Ember.removeObserver(resolve, 'success');
        this.send('showMessageModal', false);
      });
      this.sendAction('sendMessage', {
        reason:"backoffice",
        message:this.get('replyMessageMsg'),
        title:this.get('replyMessageTitle'),
        from: {
          uid: this.get('session.data.authenticated.userId'),
          utype:"backoffice"
        },
        to:{
          uid:this.get('model.id'),
          utype:"backoffice"
        }
      },resolve);
    }
  }
});

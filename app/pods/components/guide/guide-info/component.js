import Ember from 'ember';

export default Ember.Component.extend({
  cover:null,
  showEditDialog:false,
  isVisible:true,

  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  
  actions:{
    updateLang(l){
      Ember.set(this.get('model'), 'lang', l.iso);
    },
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) this.sendAction('cancel');
    },
    editGuide(){
      this.sendAction('save',['lang', 'currency', 'phone', 'email']);
    },
  }
});

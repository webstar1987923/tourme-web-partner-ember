import Ember from 'ember';

export default Ember.Component.extend({
  showEditDialog:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  dataUtils: Ember.inject.service('dataUtils'),
  emailValidation: Ember.computed('dataUtils',function(){
    return this.get('dataUtils.validations.emailValidation');
  }),
  actions:{
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) {
        this.sendAction('cancel');
      } 
    },
    editGuide(){
      this.toggleProperty('newLangChange');
      this.sendAction('save',['guideInfo.questions','guideInfo.references']);
    },
  }
});

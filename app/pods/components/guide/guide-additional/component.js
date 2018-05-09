import Ember from 'ember';

export default Ember.Component.extend({
  showEditDialog:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  specialties:Ember.computed('model.guideInfo.specialties','changeAttr', function(){
    let i18n = this.get('i18n');
    var resp = [];
    if ( this.get('model.guideInfo.specialties') ) {
      resp = this.get('model.guideInfo.specialties').reduce(function(clean, row){
        clean.push(i18n.t(`tt_${row}`)); 
        return  clean;
      }, [])
    }
    return resp;
  }),
  actions:{
    removeHobby(hobby){
      this.get('model.guideInfo.hobbies').removeObject(hobby);
    },
    addHobby(hobby){
      this.get('model.guideInfo.hobbies').addObject(hobby);
    },
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) {
        this.sendAction('cancel');
      } 
    },
    editGuide(){
      this.sendAction('save',['guideInfo.aboutYou','guideInfo.howLongLived','guideInfo.toursBefore','guideInfo.hobbies','guideInfo.specialties']);
    },
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  tourPicture:Ember.computed('model', function(){
    return this.get('model.tour') ? this.get('model').tour.pictures[0] : null;
  }),
  actions:{
    showLongDes(){
      this.set('showLongDescription',true);
    },
    hideLongDes(){
      this.set('showLongDescription',false);
    },
  }
});

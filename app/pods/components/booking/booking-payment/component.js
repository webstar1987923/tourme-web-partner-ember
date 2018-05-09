import Ember from 'ember';

export default Ember.Component.extend({
  dataUtils: Ember.inject.service('dataUtils'),
  amount:Ember.computed('model.costExt', function(){
    return this.get('model.costExt') && this.get('model.costExt.final') ? this.get('dataUtils.transform').amount(this.get('model.costExt.final')) : {text:"-"};
  }),
  actions:{
    returnMoney(){
      //TODO
    }
  }
});

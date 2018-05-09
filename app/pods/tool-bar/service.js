import Ember from 'ember';


export default Ember.Service.extend({
  statusBack:null,
  init(){
    this._super(...arguments);
    this.set('statusBack', false);    
  },


});

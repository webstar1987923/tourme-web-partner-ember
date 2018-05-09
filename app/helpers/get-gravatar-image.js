import Ember from 'ember';
export default Ember.Helper.extend({
  dataUtils: Ember.inject.service('dataUtils'),
  compute(params/*, hash*/){
    return params[0] ? this.get('dataUtils.utils').getGravatarImage(params[0]) : null;
  }
});
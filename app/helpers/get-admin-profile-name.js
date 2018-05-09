import Ember from 'ember';

export default Ember.Helper.extend({
  appConstants: Ember.inject.service('app-constants'),
  dataUtils: Ember.inject.service('data-utils'),
  compute(params/*, hash*/){
    let value = params[0];
    return this.get('dataUtils').transform.getAdminProfileName(value, this.get('appConstants'));
  }
});

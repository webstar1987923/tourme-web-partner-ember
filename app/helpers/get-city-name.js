import Ember from 'ember';

export function getCityName(params/*, hash*/) {
  let city = params[0];
  return city && city.get('nameT') ? city.get('nameT')[0].text:null;
}

export default Ember.Helper.helper(getCityName);

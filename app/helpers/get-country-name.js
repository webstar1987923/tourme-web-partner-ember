import Ember from 'ember';
import { getName } from 'ember-i18n-iso-countries';

export function getCountryName(params/*, hash*/) {
  let country = params[0];
  return country? getName(country.toUpperCase(),"en"):"";
}

export default Ember.Helper.helper(getCountryName);

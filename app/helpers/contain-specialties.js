import Ember from 'ember';

export function containSpecialties(params/*, hash*/) {
  var specialties = params[0];
  var tourType = params[1];
  return specialties && (specialties.indexOf(tourType) != -1 || specialties.indexOf('all') != -1);
}

export default Ember.Helper.helper(containSpecialties);

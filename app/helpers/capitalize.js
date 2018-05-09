import Ember from 'ember';

export function capitalize([string]/*, hash*/) {
  return string ? string.capitalize() : null;
}

export default Ember.Helper.helper(capitalize);


import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return Ember.String.htmlSafe(`background:url('${params[0]}') no-repeat center center; background-size: cover;`);
});

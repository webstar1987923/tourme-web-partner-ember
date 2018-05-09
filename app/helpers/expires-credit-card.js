import Ember from 'ember';

export function expiresCreditCard(params/*, hash*/) {
  let expires = params[0];
  return  `${moment((expires.month+1), 'MM').format('MMMM')} ${expires.year}`;
}

export default Ember.Helper.helper(expiresCreditCard);

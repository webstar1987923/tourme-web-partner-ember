import Ember from 'ember';

export function phoneFormat(params/*, hash*/) {
  if ( params[0] ) {
    let phone = params[0].toString();
    if ( phone.charAt(0) != '+' ) phone = '+'+phone;
    return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4'); 
  }
}

export default Ember.Helper.helper(phoneFormat);

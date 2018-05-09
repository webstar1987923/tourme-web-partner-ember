import Ember from 'ember';

export function getMessageAbout(params/*, hash*/) {
  let text = null;
  let message = params[0];
  if ( message.get('title') ) {
    text = message.get('title');
  } else if ( message.get('reason') ) {
    text = message.get('reason')
  }
  return text;
}

export default Ember.Helper.helper(getMessageAbout);

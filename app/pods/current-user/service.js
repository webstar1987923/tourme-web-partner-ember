import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Service.extend({

  session: service('session'),
  store: service(),

  load() {
    let userId = this.get('session.data.authenticated.userId');
    //let firstName = this.get('session.data.authenticated.picture');
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('user', user);
      });
    } else {
      return Ember.RSVP.resolve();
    }
  }

});

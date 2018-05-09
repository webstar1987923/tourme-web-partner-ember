import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  actions: {
    validityChange() {
      Ember.Logger.info("Validación");
    }
  }
});

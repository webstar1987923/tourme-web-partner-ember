import Ember from 'ember';

let MyComponent = Ember.Component.extend({});

MyComponent.reopenClass({
  positionalParams: ['icon']
});

export default MyComponent;
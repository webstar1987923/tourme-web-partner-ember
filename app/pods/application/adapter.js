import RESTAdapter from 'ember-data/adapters/rest';
import Config from 'tourme-partner/config/environment';
import Ember from 'ember';

Ember.$.ajaxSetup({
    crossDomain:true,
    xhrFields: {
        withCredentials: true
    },
});

export default RESTAdapter.extend({
	namespace: Config.namespace,
	host: Config.host,
}); 
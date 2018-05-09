import Ember from 'ember';

export default Ember.Component.extend({
  dataUtils: Ember.inject.service('dataUtils'),
  languages:Ember.computed('model.guide.langs', function(){
    return this.get('dataUtils.transform').languages(this.get('model.guide.langs'), this.get('i18n'));
  })
});

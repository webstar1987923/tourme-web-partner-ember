import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(''),
  pic:DS.attr('string'),
  firstName:DS.attr('string'),
  lastName: DS.attr('string'),
  phone: DS.attr('string'),
  currency: DS.attr('string'),
  lang: DS.attr('string'),
  //content: DS.attr('string'),
  guideInfo: DS.attr(''),
  rating: DS.attr(''),
  complete: DS.attr(''), 
  address:DS.attr(''), 
  backInfo:DS.attr(''), 
  langs:DS.attr(''),
  dayOfBirth:DS.attr('string'),
  gender:DS.attr('string')
});

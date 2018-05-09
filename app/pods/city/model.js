import DS from 'ember-data';

export default DS.Model.extend({
  country :DS.attr('string'),
  city    :DS.attr('string'),
  nameT   :DS.attr(), //Llega un array
  status  :DS.attr('string')
});

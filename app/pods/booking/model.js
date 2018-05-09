import DS from 'ember-data';

export default DS.Model.extend({
  country   :DS.attr('string'),
  scheduled :DS.attr('date'),
  btype     :DS.attr('string'), 
  status    :DS.attr('string'), //aproved y demás
  uid       :DS.attr('string'),
  reason    :DS.attr('string')  
});

import DS from 'ember-data';

export default DS.Model.extend({
  guide         :DS.attr(''),
  user          :DS.attr(''),
  scheduled     :DS.attr('date'),
  start         :DS.attr('date'),
  end           :DS.attr('date'),
  status        :DS.attr('string'),
  method        :DS.attr('string'),
  methodId      :DS.attr('string'),
  duration      :DS.attr('number'), //minutes
  comments      :DS.attr(''),
  uid           :DS.attr('string'),
  gid           :DS.attr('string')
});

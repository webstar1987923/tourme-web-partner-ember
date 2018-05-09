import DS from 'ember-data';

export default DS.Model.extend({
  tourIcon :DS.attr('string'),
  city     :DS.attr('string'),
  country  :DS.attr('string'),
  uDate    :DS.attr('date'),
  duration :DS.attr('number'),
  cost     :DS.attr({ defaultValue: function() { return {"amount":"", "currency":"EUR"}; } }),
  endurance:DS.attr('string'),
  capacity :DS.attr('number'),
  flags    :DS.attr({ defaultValue: function() { return {"kids":false, "handycap":false, "carUsed":false, "shoreExc":false}; } }), //Llega un array
  pic      :DS.attr('string'),
  name     :DS.attr('string'),
  status   :DS.attr('string'), //aproved y demás
  uid      :DS.attr('string'),
  shortDesc:DS.attr('string'),
  longDesc :DS.attr('string'),
  tourTypes:DS.attr({ defaultValue: function() { return []; } }),
  extraCost:DS.attr('string'),
  startTime:DS.attr({ defaultValue: function() { return {"first":null, "last":null}; } }),
  moreInfo :DS.attr('string')
});

import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',
  modelExceptions: Ember.inject.service('model-exceptions'),
	serializeId: function(id) {
		return id.toString();
	},
  serializeIntoHash: function(data, type, record, options) {
    var root = Ember.String.decamelize(type.modelName);
    var exceptions = this.get('modelExceptions')[root];

    Ember.Logger.info("Serializer root model", root);
    Ember.Logger.info("Serializer model exceptions", exceptions);

    var serData = this.serialize(record, options);
    if ( exceptions ) {
      //quitamos las excepciones del modelo
      exceptions.map(function(key){
        //algoritmo para quitar los keys del tipo guideInfo.country o guideInfo.vehicle.model (seguramente se podrá hacer de otro modo)
        let arrayKeys = key.split('.');
        let length = arrayKeys.length;
        let dataAux = serData;
        for ( var i = 0; i<length-1; i++ ) {
          dataAux = dataAux[arrayKeys[i]];
        }
        delete dataAux[arrayKeys[length-1]];
      })
    }

    //quitamos valores a null
    Object.keys(serData).map(function(key){
      if ( Ember.isEmpty(serData[key]) ) {
        delete serData[key];
      }
    })
    // $.each(serData, function(key, value){
    //   if ( Ember.isEmpty(value) ) {
    //     delete serData[key];
    //   }
    // });
    Ember.Logger.info("Serializer Final model", JSON.stringify(serData));
    data[root] = serData;
  },
});
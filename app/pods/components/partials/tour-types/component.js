import Ember from 'ember';

export default Ember.Component.extend({
  changeAttr:false,
  //tour types tabulados en x columnas
  tourTypes:Ember.computed('appConstants.tourType', function(){
    let resp = [];
    let row = [];
    let numColumn = 3;
    this.get('appConstants.tourType').map(function(t, i){
      if ( i && i % numColumn == 0 ) {
        resp.push(row);
        row = [];
      }
      row.push(t);
    });
    if ( row.length ) resp.push(row);
    return resp;
  }),
  specialties:Ember.computed('changeAttr', function(){
    return Ember.get(this.get('model'),this.get('field'));
  }),
  actions:{
    changeSpecialties(tourType, active){
      var specialties = Ember.get(this.get('model'),this.get('field'));
      if ( active ){
        if ( tourType.name == "all" ) {
          specialties = ["all"];
        } else {
          specialties.push(tourType.name);
          if ( specialties.length == (this.get('appConstants.tourType').length -1) ) specialties = ["all"];
        }
      } else {
        if ( tourType.name == "all" ) {
          specialties = [];
        } else {
          if ( specialties[0] == "all" ) specialties = this.get('appConstants.tourType').reduce(function(clean, row){
            if ( row.name != "all" ) clean.push(row.name); 
            return  clean;
          }, [])
          specialties = specialties.reduce(function(clean, row){
            if ( row != tourType.name ) clean.push(row); 
            return  clean;
          }, [])
        }
      }

      Ember.set(this.get('model'),this.get('field'), specialties);
      this.toggleProperty('changeAttr');
    }
  }
});

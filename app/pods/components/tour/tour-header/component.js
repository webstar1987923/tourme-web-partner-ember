import Ember from 'ember';
import { getName } from 'ember-i18n-iso-countries';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  cover:null,
  showEditDialog:false,
  store: service(),
  countryName :  Ember.computed('model.country', function(){
    let pp = this.get('model.country');
    return pp? getName(pp.toUpperCase(),"en"):"";
  }),

  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),

  imageCover:Ember.computed('model.pictures', 'cover', function(){
    return this.get('cover') || this.get('model.pictures')[0];
  }),

  cities:Ember.computed('model', function(){
    let modelCountry = this.get('model.country');
    return this.get('store').peekAll('city').filter(function(item){
      return item.get('country') == modelCountry;
    });
  }),
  getCityName(city){
    let cityName = null;
    this.get('cities').any(c => {
      if ( c.get('city') == city ) {
        cityName = c.get('nameT')[0].text;
        return true;
      } 
      return false;
    });
    return cityName;
  },
  
  actions:{
    showEditTour(){
      this.set('showEditDialog',true);
    },
    cancelEditTour(){
      this.set('showEditDialog',false);
      this.sendAction('cancel');
    },
    editTour(){
      this.sendAction('save',['name', 'city', 'shortDesc', 'longDesc']);
    },
    changeCity(m,e){
      //seteamos cityName para que se actualice en el header
      let city = e.get('city');
      Ember.set(this.get('model'), 'cityName', this.getCityName(city));
      Ember.set(this.get('model'), 'city', city);
    },
    showLongDes(){
      this.set('showLongDescription',true);
    },
    hideLongDes(){
      this.set('showLongDescription',false);
    },
  }
});

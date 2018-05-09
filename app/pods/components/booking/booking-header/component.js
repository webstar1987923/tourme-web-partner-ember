import Ember from 'ember';
import { getName } from 'ember-i18n-iso-countries';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  classNames: ['booking-header'],
  alertSolved:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('alertSolved',false);
  }),
  bookingImage:Ember.computed('model', function(){
    let model = this.get('model');
    let resp = null;
    switch (model.btype) {
      case 'instant':
      case 'guide':
        resp = model.guide.pic;
      break;
      case 'fixed':
      case 'shore':
        resp = model.tour.pictures[0];
      break;
    }
    return resp;
  }),
  bookingName:Ember.computed('model', function(){
    let model = this.get('model');
    let resp = null;
    switch (model.btype) {
      case 'instant':
        resp = "Instant Tour";
      break;
      case 'guide':
        resp = "Open Tour";
      break;
      case 'fixed':
      case 'shore':
        resp = model.tour.name;
      break;
    }
    return resp;
  }),

  store: service(),
  countryName :  Ember.computed('model.country', function(){
    let pp = this.get('model.country');
    return pp? getName(pp.toUpperCase(),"en"):"";
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
    showConfirmSolved(show){
      this.set('alertSolved', show);
    },
    solvedAttention(){
      this.sendAction('solvedAttention')
    }
  }
});

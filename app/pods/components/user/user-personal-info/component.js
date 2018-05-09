import Ember from 'ember';
import { getName } from 'ember-i18n-iso-countries';
export default Ember.Component.extend({
  modalImage:null,
  countryName :  Ember.computed('model.address.country', function(){
    let pp = this.get('model.address.country');
    return pp? getName(pp.toUpperCase(),"en"):"";
  }),
  birthday:Ember.computed('model.dayOfBirth', function(){
    return this.get('model.dayOfBirth') ? moment(this.get('model.dayOfBirth')).format('MM/DD/YYYY') : null;
  }),
  showEditDialog:false,

  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
  }),
  yearRange:Ember.computed(function(){
    //ponemos un rango para el cumpleaños desde hace 18 años hasta 80 años atrás
    let minimunAge = 18;
    let currentYear = moment().format('YYYY');
    let minYear = currentYear - minimunAge - 80;
    return `${minYear},${currentYear-minimunAge}`;
  }),
  maxDate:Ember.computed(function(){
    return moment().subtract(18,"years").toDate();
  }),

  actions:{
    closeDialog(){
      this.set('showModalImage',false);
    },
    openImageModal(im){
      this.set('modalImage',im);
      this.set('showModalImage',true);
    },
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) this.sendAction('cancel');
      else {
        if ( Ember.isNone(this.get('model.address')) ) Ember.set(this.get('model'), 'address',{});
      }
    },
    updateCountry(l){
      Ember.set(this.get('model'), 'address.country', l.iso);
    },
    editUser(){
      let fields = ['dayOfBirth', 'gender'];
      if ( Object.keys(this.get('model.address')).length > 0 ) {
        fields.push('address')
      }
      this.sendAction('save',fields);
    },
  }
});

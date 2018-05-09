import Ember from 'ember';
import { getName } from 'ember-i18n-iso-countries';
export default Ember.Component.extend({
  modalImage:null,
  countryName :  Ember.computed('model.guideInfo.address.country', function(){
    let pp = this.get('model.guideInfo.address.country');
    return pp? getName(pp.toUpperCase(),"en"):"";
  }),
  birthday:Ember.computed('model.guideInfo.dayOfBirth', function(){
    return this.get('model.guideInfo.dayOfBirth') ? moment(this.get('model.guideInfo.dayOfBirth')).format('MM/DD/YYYY') : null;
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
    },
    updateCountry(l){
      Ember.set(this.get('model'), 'guideInfo.address.country', l.iso);
    },
    editGuide(){
      let fields = ['guideInfo.dayOfBirth', 'guideInfo.gender']
      if ( Object.keys(this.get('model.guideInfo.address')).length > 0 ) {
        fields.push('guideInfo.address');
      }
      this.sendAction('save',fields);
    },
  }
});

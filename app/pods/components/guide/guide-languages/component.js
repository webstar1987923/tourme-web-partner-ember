import Ember from 'ember';

export default Ember.Component.extend({
  newLangChange:false,
  newLangs:Ember.A([]),
  showEditDialog:false,
  initNewLangs(){
    this.set('newLangs',Ember.A([]));
  },
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.set('showEditDialog',false);
    this.initNewLangs();
  }),
  guideLanguages:Ember.computed('model.guideInfo.langs.length','newLangChange',function(){
    return this.get('model.guideInfo.langs')
  }),
  //Devuelve la lista de idiomas menos los que ya tiene asignados
  languages:Ember.computed('appConstants.languages', 'model.guideInfo.langs', 'newLangChange', function(){
    var languages = this.get('appConstants.languages');
    var modelLangs = this.get('model.guideInfo.langs');
    return languages.reduce(function(clean, row){
      if ( !modelLangs.findBy('lang', row.iso) ) clean.push(row); 
      return  clean;
    }, [])
  }),
  checkNewLang(newLang){
    //buscamos el lang en el array del modelo, si no está añadimos el idioma al modelo
    if ( newLang.lang && newLang.fluency ) {
      var modelLangs = this.get('model.guideInfo.langs');
      if ( !modelLangs.findBy('lang', newLang.lang) ) modelLangs.push(newLang);
      this.initNewLangs();
      this.toggleProperty('newLangChange');
    }
  },
  actions:{
    addNewLang(){
      if ( !this.get('newLangs').get('lastObject') || this.get('newLangs').get('lastObject').lang && this.get('newLangs').get('lastObject').fluency ) {
        this.get('newLangs').addObject({
          lang:null,
          fluency:null
        })
      }
    },
    updateLang(l,e){
      Ember.set(l,'lang', e.iso);
      this.toggleProperty('newLangChange');
    },
    setNewLang(newLang, e){
      Ember.set(newLang,'lang', e.iso);
      this.checkNewLang(newLang);
    },
    setNewFluency(newLang, e){
      Ember.set(newLang,'fluency', e);
      this.checkNewLang(newLang);
    },
    deleteLang(lang){
      this.set('model.guideInfo.langs', this.get('model.guideInfo.langs').reduce(function(clean, row){
        if ( row.lang != lang.lang ) clean.push(row); 
        return  clean;
      }, [])); 
      this.set('newLangs', this.get('newLangs').reduce(function(clean, row){
        if ( row.lang != lang.lang ) clean.push(row); 
        return  clean;
      }, [])); 
  
      this.toggleProperty('newLangChange');
    },
    showEdit(show){
      this.set('showEditDialog',show);
      if ( !show ) {
        this.sendAction('cancel');
        this.initNewLangs();
        this.toggleProperty('newLangChange');
      } 
    },
    editGuide(){
      this.toggleProperty('newLangChange');
      this.sendAction('save',['guideInfo.langs']);
    },
  }
});

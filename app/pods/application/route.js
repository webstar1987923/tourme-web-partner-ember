import Ember from 'ember';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;
export default Route.extend(ApplicationRouteMixin,{
  currentUser: service(),
  dataUtils: Ember.inject.service('dataUtils'),
  beforeModel() {
    return this._loadCurrentUser();   
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
    this.afterInit();
  },

  _loadCurrentUser() {
    //this.a2Acl.load();
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

  model(){
    //pedimos datos de la aplicación
    this.getAppData();    
  },  
  activate:function(){
    // this.getUserLang();
    // console.log(JSON.stringify(this.get('session.data.authenticated')));
    var userId = this.get('session.data.authenticated.userId');
    if ( !Ember.isNone(userId) ) {
      this.afterInit();
    } else {
      this.replaceWith('index');
    }
  },
  afterInit(){
    this.checkSessionPicture();
    //this.replaceWith('interviews');
  },

  checkSessionPicture(){
    if ( !this.get('session.data.picture') && this.get('session.data.authenticated.picture') ) {
      this.get('session').set('data.picture', this.get('session.data.authenticated.picture'));
    }
    
    if ( !this.get('session.data.picture') ) {
      //si no tiene foto asignamos foto de gravatar
      this.set('session.data.picture',this.get('dataUtils.utils').getGravatarImage(this.get('session.data.authenticated.email')));
    }
  },

  sessionInvalidated: function(){
    this.get('session').set('data.picture',null);
    this._super(...arguments);
  },

  getAppData(){
      //pedimos cities
      this.get('store').findAll('city');  
  },


	getUserLang(){
		//seteamos idioma
		//var lang = navigator.language || navigator.userLanguage || 'en-GB';
        //seteamos locales en moment
        // switch (lang) {
        //     case 'es':
        //     case 'es-ES':
        //         moment.updateLocale('es', {
        //             calendar: {
        //             lastDay: '[Ayer]',
        //             sameDay: '[Hoy a las] HH:mm',
        //             nextDay: '[Mañana]',
        //             lastWeek: 'dddd',
        //             nextWeek: 'dddd',
        //             sameElse: 'dd,D MMM'
        //             },
        //             week : {
        //                 dow : 1, // Monday is the first day of the week.
        //                 doy : 4  // The week that contains Jan 4th is the first week of the year.
        //             },
        //             weekdaysMin : 'Lu_Ma_Mi_Ju_Vi_Sa_Do'.split('_'),
        //             weekdaysShort : 'Lun_Mar_Mie_Jue_Vie_Sab_Dom'.split('_'),
        //             weekdays : 'Lunes_Martes_Miercoles_Jueves_Viernes_Sabado_Domingo'.split('_'),
        //             weekdaysParseExact : true,
        //             monthsShort : 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        //             relativeTime : {
        //                 future: "en %s",
        //                 past:   "hace %s",
        //                 s:  "%d segundo",
        //                 ss: "%d segundos",
        //                 m:  "%d minuto",
        //                 mm: "%d minutos",
        //                 h:  "%d hora",
        //                 hh: "%d horas",
        //                 d:  "%d día",
        //                 dd: "%d días",
        //                 w:  "%d semana",
        //                 ww: "%d semanas",
        //                 M:  "%d mes",
        //                 MM: "%d meses",
        //                 y:  "%d año",
        //                 yy: "%d años"
        //             }
        //         });
        //         break;
        //     default:
        //     moment.updateLocale('en', {
        //         calendar: {
        //             lastDay: '[Yesterday]',
        //             sameDay: '[Today at] LT',
        //             nextDay: '[Tomorrow]',
        //             lastWeek: 'dddd',
        //             nextWeek: 'dddd',
        //             sameElse: 'dd,D MMM'
        //             },
        //             week : {
        //                 dow : 1, // Monday is the first day of the week.
        //                 doy : 4  // The week that contains Jan 4th is the first week of the year.
        //             },
        //             weekdaysMin : 'Mo_Tu_We_Th_Fr_Sa_Su'.split('_'),
        //             weekdaysShort : 'Mon_Tue_Wed_Thu_Fri_Sat_Sun'.split('_'),
        //             weekdays:'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_'),
        //             weekdaysParseExact : true,
        //             relativeTime : {
        //                 future: "in %s",
        //                 past:   "%s ago",
        //                 s:  "%d second",
        //                 ss: "%d seconds",
        //                 m:  "%d minute",
        //                 mm: "%d minutes",
        //                 h:  "%d hour",
        //                 hh: "%d hours",
        //                 d:  "%d day",
        //                 dd: "%d days",
        //                 w:  "%d week",
        //                 ww: "%d weeks",
        //                 M:  "%d month",
        //                 MM: "%d months",
        //                 y:  "%d year",
        //                 yy: "%d years"
        //             },
        //         });
        //     }
	},
	actions:{
    toProfile(){
      var userId = this.get('session.data.authenticated.userId');
      this.transitionTo('guide', userId);
    },
    showLoading(){
      Ember.Logger.info("show loading application");
      this.controllerFor('application').set('showLoadingDialog', true); 
    },
    hideLoading(){
      this.controllerFor('application').set('showLoadingDialog', false);
    },
		error(){
			// this.ajaxError(error);
		},
    recoverPwd(email){
      this.send('showLoading');
      this.get('remote').user.forgotPwd(email).then(()=>{
        this.toast.success("Check your email");
        this.send('hideLoading');
        this.controllerFor('application').toggleProperty('saveSuccess');
      }).catch(err=>{
        Ember.Logger.error("Error:", err)
        this.toast.error("error recovering the password");
        this.controllerFor('application').set('showLoadingDialog', false); 
      });
    },
    changePwd(currentPwd, newPwd){
      this.send('showLoading'); 
      this.get('remote').user.changePwd(currentPwd, newPwd).then(()=>{
        this.toast.success("Password changed successfully");
        this.send('hideLoading');  
        this.controllerFor('application').toggleProperty('saveSuccess');
      }).catch(err=>{
        Ember.Logger.error("Error:", err)
        this.toast.error("Error changing password");
        this.send('hideLoading'); 
      });
    },
    changeProfilePic(file){
      this.send('showLoading');
      this.get('remote').user.changeProfilePic(this.get('session.data.authenticated.userId'), file).then((newPic)=>{
        //no podemos modificar los datos de authenticated porque son de solo lectura, por eso lo guardamos en data
        this.get('session').set('data.picture', newPic);
        this.toast.success("Picture changed successfully");
        this.send('hideLoading');  
        this.controllerFor('application').toggleProperty('saveSuccess');
      }).catch(err=>{
        Ember.Logger.error("Error:", err)
        this.toast.error("Error changing picture");
        this.send('hideLoading');
      });
    },
    sendMessage(msg, resolve, handledLoading){
      if ( !handledLoading) this.send('showLoading');
      let newMessage = this.get('store').createRecord('message', msg);
      newMessage.save().then(()=>{
        if ( !handledLoading) this.send('hideLoading');
        if ( resolve ) Ember.set(resolve,'success',true);
        this.toast.success("Message sent");
      }).catch(err=>{
        Ember.Logger.error("Error: ",err);
        if ( resolve ) Ember.set(resolve,'error',true);
        if ( !handledLoading) this.send('hideLoading');
        this.toast.error("Error sending message");
      });
    }
     
	}
  // model() {
  //   var id = '59e466aaee217ad30bbf57c9';
  //   return this.get('store').findRecord('user', id)
  // }     
})


import Ember from 'ember';
//import Config from 'tourme/config/environment';

const { service } = Ember.inject;
const O = Ember.Object;

function auth2LoginType(session, type, login, password, callback){
  session.authenticate('authenticator:oauth2', login, password, type).catch((reason) => {
    if ( callback ) callback(reason);
  });
}
export default Ember.Component.extend({
  classNames: ['login-form'],
  session: service('session'),
  store: service(),
  newUser: O.create({}),
  newErrors: null,
  loadingAction:false,
  loginEmail:true,
  //torii: Ember.inject.service(),
  modalForgot:false,
  recoverEmail:null,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.send('showModalForgot', false);
  }),
  dataUtils: Ember.inject.service('dataUtils'),
  emailValidation: Ember.computed('dataUtils',function(){
    return this.get('dataUtils.validations.emailValidation');
  }),

  actions: {

    authenticateWithOAuth2() {
      this.set('loadingAction', true);
      var that = this;
      var password = this.get('passwordLogin');
      var login = this.get('identification');

      // var type = this.get('loginEmail') ? "email":"uname";
      // intentamos hacer login con email y si falla hacemos login con usuario
      auth2LoginType(this.get('session'), "email", login, password, function(reason){
        if ( reason ) {
          if ( !Ember.isNone(reason.responseJSON) && !Ember.isNone(reason.responseJSON.message)){
            //User not Authorized!
            //reason.responseJSON.message == "Password is wrong") 
            that.get('toast').error(reason.responseJSON.message);
          }  else {
            that.get('toast').error("login error");
          }
        }
        Ember.set(that, 'loadingAction', false)
      });
    },
    
    loginEmailUsernameChange(){
      this.set('identification', null);
      this.set('passwordLogin', null);

      this.toggleProperty('loginEmail');
    },
    showModalForgot(show){
      Ember.set(this, 'modalForgot', show);
    },
    forgotPassword(){
        this.sendAction('actionRecoverPwd', this.get('recoverEmail'));
    },
    register(){
      Ember.Logger.info("New guide")
    }
    
  }
});

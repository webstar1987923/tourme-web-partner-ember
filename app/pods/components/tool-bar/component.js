//import Ember from 'ember';

// const { inject: { service }, Component } = Ember;

// export default Component.extend({
//   session:     service('session'),
//   currentUser: service('current-user')
// });
// 
import Ember from 'ember';

const { inject: { service } } = Ember;


export default Ember.Component.extend({
  toolBar       :service(),
  session       :service(),
  currentUser   :service(),
  newUserPicture:null, //imagen para mostrar
  newImage:null, //file

  modalChangePassword: false,
  modalChangeProfilePicture:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.send('showChangePassword', false);
    this.send('showChangeProfilePicture', false);
  }),
  newpasswordValidation:[{
    message: 'mínimo 6 caracteres, al menos 1 número, al menos 1 letra',
    validate: (inputValue) => {
      let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return !inputValue || passwordPattern.test(inputValue);
    }
  }],

  userProfilePicture:Ember.computed('newUserPicture','session',function(){
    return this.get('newUserPicture') || this.get('session.data.picture');
  }),

  checkMatchPasswords(){
    let newPassword = this.get('newPassword');
    let confirmPassword = this.get('confirmPassword');
    if ( newPassword && newPassword.length && confirmPassword && confirmPassword.length && confirmPassword != newPassword ) {
      this.set('newPasswordValidation', ["Passwords don't match"]);
    } else {
      this.set('newPasswordValidation', null);
    }
  },
  actions: {
    toProfile(){
      this.sendAction('toProfile');
    },
    showChangeProfilePicture(show){
      this.set('modalChangeProfilePicture', show);
      if ( !show ) {
        this.set('newUserPicture', null);
        this.set('newImage', null);
      }
    },
    showChangePassword(show){
      this.set('modalChangePassword', show);
      if ( !show ) {
        this.set('confirmPassword', null);
        this.set('newPassword', null);
        this.set('currentPassword', null);
      }
    },
    changeNewPassword(v){
      this.set('newPassword', v);
      this.checkMatchPasswords();
    },
    changeConfirmPassword(v){
      this.set('confirmPassword', v);
      this.checkMatchPasswords();
    },
    changePassword(){
      this.sendAction('actionChangePwd', this.get('currentPassword'), this.get('newPassword'));
    },
    changeProfilePicture(){
      this.sendAction('actionChangeProfilePic', this.get('newImage'));
    },
    selectImage(data){
      if ( !Ember.isNone(data.files) ) {
        this.send('chargeImage', data.files[0], 'newCropperPicture');
      }
    },
    chargeImage: function(file, imageContainer){ //carga la imagen
      var that = this;
      var reader = new FileReader();
        reader.readAsDataURL(file);  
        var image  = new Image();
        reader.onload = function(_file) {
            image.src    = _file.target.result;
            image.onload = function() {
              Ember.set(that, imageContainer, this.src);
            };
            image.onerror= function() {
              that.get('toast').error('Unexpected error');
            };      
        };
    },
    cancelCropper(){
      this.set('newCropperPicture',null);
    },
    acceptCropper(blob){
      this.send('chargeImage', blob, 'newUserPicture');
      this.set('newImage', blob);
      this.set('newCropperPicture',null);
    },
    logout(){
      //this.store.unloadAll();
      this.get('session').invalidate();
    },
    back(){
      history.back();
    }
  }  

});
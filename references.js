
//register de user
//You can update fields like this (see guide controller)
save(fields){
  this.send('showLoading');
  this.get('remote').guide.update(this.get('model'), fields)
  .then(()=>{
    this.toast.success("Data saved successfully");
    this.send('hideLoading');
    this.toggleProperty('saveSuccess');  
  }).catch(err=>{
    Ember.Logger.error("Error:", err)
    this.toast.error("Error saving data");
    this.send('hideLoading');
    this.send('cancel'); //si falla devolvemos el modelo a su estado original
  });
},

Step 1 
--------
a) Save with
{
  email:{
    login:$.inputEmail.getValue(),
    password:$.inputPassword.getValue()
  },
  lang:getUserLang()
};

b) afterSave
Login with email/password

import Ember from 'ember';

export default Ember.Controller.extend({
  guidePictures:Ember.A([]),
  saveSuccess:false,
  numTours:0,
  numBookings:0,
  numMessages:0,
  numRatings:0,
  session: Ember.inject.service('session'),
  actions: {
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
    startInterview(){
      this.send('showLoading');
      Ember.set(this.get('interview'),'uid',this.get('session.data.authenticated.userId'));
      Ember.set(this.get('interview'),'start',new Date());
      this.get('interview').save().then(()=>{
        this.send('hideLoading');
        this.toast.success("The interview has starting");
      }).catch(()=>{
        this.get('interview').rollbackAttributes();
        this.send('hideLoading');
        this.toast.error("Error starting interview");
      });
    },
    endInterview(guideStatus){
      this.send('showLoading');
      //si no viene guide status es que decidiremos más tarde, guardamos solo para guardar los comentarios
      if ( !Ember.isNone(guideStatus) ) {
        Ember.set(this.get('interview'),'end',new Date());
      }
      this.get('interview').save().then(()=>{
        this.send('hideLoading');
        this.toggleProperty('saveSuccess');
        //cambiamos status del usuario
        //TODO ver que hacemos si esto falla
        if ( !Ember.isNone(guideStatus) ) {
          this.toast.success("The interview has finished");
          Ember.set(this.get('model'),'guideInfo.approved', guideStatus);
          this.save('save',['guideInfo.approved']);
        }
      }).catch(()=>{
        this.get('interview').rollbackAttributes();
        this.send('hideLoading');
        this.toast.error("Error finishing interview");
      });
    },
    cancel(){
      this.get('model').rollbackAttributes();
      this.send('reloadModel'); //TODO ver si usamos esto para volver al estado inicial si no queremos usar fragmentos
      // this.model.rollbackAttributes();
    }        
  }  
});

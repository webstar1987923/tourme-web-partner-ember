import Ember from 'ember';
import Component from '@ember/component';
const { inject: { service }, isEmpty } = Ember;

export default Component.extend({
  session:service(),
  model:null,
	linear: true,
	vertical: false,
  dataUtils: Ember.inject.service('dataUtils'),
  nextStep:null,
  currentStep:0,
  alertNoTypes:false,

	firstAvailableHour:Ember.computed('model.startTime', function(){
    let first =  this.get('model.startTime.first');
    let res = first ? this.get('dataUtils.transform').convert12HourFormat(first):null;
    return res
  }),
  lastAvailableHour:Ember.computed('model.startTime.last', function(){
    let last =  this.get('model.startTime.last');
    let res = last ? this.get('dataUtils.transform').convert12HourFormat(last):null;
    return res
  }),

	actions:{
		validityChange(isValid, isTouched, isInvalidAndTouched) {
			this.set('isInvalid', isInvalidAndTouched);
		},
		setStartTime(field, time){
      var startTime = Ember.Object.create(this.get('model.startTime') || {});
      startTime.set(field, this.get('dataUtils.transform').convertTo24Hour(time));
      Ember.set(this.get('model'), 'startTime', startTime);
    },
    submitForm(){
      let currentStep = this.get('currentStep');
      let allOk = true;
      let userId = this.get('session.data.authenticated.userId');
      //Extra Validation
      switch (currentStep) {
        case 0: //Step 1 Add Tour
          //Tour Types not Empty
          if ( !this.get('model.tourTypes').length )  {
            this.set('alertNoTypes', true);
            allOk=false;
          }
          break;
        case 1:
          break;
        case 2:
          this.set('model.uid', userId);
          this.set('model.status', 'pending');
          this.get('model').save()
          .then((tour)=>{
            this.sendAction('resetModal');
          })
          .catch(Ember.Logger.error);

          allOk=false;
          break;
        default:
          break;
      }

      //If last Save
      //Addicional Validation
      if (allOk) this.get('nextStep')();
    },

    next(nextStep, submit){
      this.set('nextStep', nextStep);
      //nextStep();
      submit();
    },
    cancel(){
      this.sendAction('resetModal');
      //this.send('saveNewTour');
    }
	}
});
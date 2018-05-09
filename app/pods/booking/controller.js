import Ember from 'ember';


export default Ember.Controller.extend({
  saveSuccess:false,
  isDisabled:true,
  // currencies:["USD","EUR","YEN"],
  // genders:["male","female"],
  // languages:["en-us", "es-es"],
  activate(){
    this.set(true, 'isDisabled')
  },
  actions: {
    edit(){
      this.toggleProperty('isDisabled');
    },
    solvedAttention(){
      var that = this;
      this.send('showLoading');
      this.get('remote').booking.solvedAttention(this.get('model')._id)
      .then(()=>{
        Ember.set(that.get('model'), 'attention', false);
        that.toast.success("Attention solved successfully");
        that.send('hideLoading');  
        that.toggleProperty('saveSuccess');  
      }).catch(err=>{
        Ember.Logger.error("Error:", err)
        that.toast.error("Error solved attention");
        that.send('hideLoading'); 
        that.toggleProperty('saveSuccess');  
      });
    },
    cancel(){
      this.toggleProperty('isDisabled');
      this.model.rollbackAttributes();
    }        
  }  
});



import Ember from 'ember';

export default Ember.Controller.extend({
  showLongDescription:false,
  saveSuccess:false,
  cover:Ember.computed('pictures', function(){
    let pictures = this.get('pictures');
    return ( pictures && pictures.length ) ? pictures[0].url : null;
  }),
  // isDisabled:true,
  // currencies:["USD","EUR","YEN"],
  // genders:["male","female"],
  // languages:["en-us", "es-es"],

  actions: {
    save(fields){
      var that = this;
      this.send('showLoading');
      this.get('remote').tour.update(this.get('model'), fields)
      .then(()=>{
        that.toast.success("Data saved successfully");
        that.send('hideLoading');
        that.toggleProperty('saveSuccess');  
      }).catch(err=>{
        Ember.Logger.error("Error:", err)
        that.toast.error("Error saving data");
        that.send('hideLoading');   
      });
    },
    cancel(){
      // this.toggleProperty('isDisabled');
      this.send('refresh');
    }        
  }  
});

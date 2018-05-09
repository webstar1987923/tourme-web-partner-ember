import Ember from 'ember';

export default Ember.Component.extend({
  showModalImage:false,
  modalImage:null,
  imName:null,

  actions:{
    closeDialog(){
      this.set('showModalImage',false);
    },
    openImageModal(im, name){
      this.set('imName', name);
      this.set('modalImage',im);
      this.set('showModalImage',true);
    },
    deleteImage(){//im
      //TODO
    }
  }
});

import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

export default imageCropper.extend({
  //override default options of cropper
  aspectRatio: 0,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',

  actions: {
    getCroppedAvatar: function() {
      var that = this;
      let container = this.$(this.get('cropperContainer'));
      container.cropper('getCroppedCanvas').toBlob(function (blob) {
        that.sendAction('acceptCropper', blob)
      });
    },
    cancelCropper(){
      this.sendAction('cancelCropper')
    }
  }
});
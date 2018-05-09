import Ember from 'ember';

export default Ember.Component.extend({
  interViewDetails:false,
  modalEndInterview:false,
  saveSuccessChange: Ember.observer('saveSuccess', function() {
    this.send('showEndInterview',false);
  }),
  session: Ember.inject.service('session'),
  endDateInterview:Ember.computed('interview.end', function(){
    return !Ember.isNone(this.get('interview.end')) ? moment(this.get('interview.end')).calendar() : null;
  }),
  comment:Ember.computed('interview.comments',function(){
    return !Ember.isEmpty(this.get('interview.comments')) ? this.get('interview.comments.firstObject.text') : null;
  }),
  scheduled:Ember.computed('interview.scheduled', function(){
    return !Ember.isNone(this.get('interview.scheduled')) ? moment(this.get('interview.scheduled')).calendar() : null;
  }),

  //True si está pending o está inprogress y nosotros somos el backoffice
  cardStatusOpen:Ember.computed('interview.status','interview.uid', function(){
    return this.get('interview.status') == "pending" || 
    (this.get('interview.status') == "inProgress" && this.get('interview.uid') == this.get('session.data.authenticated.userId'));
  }),
  actions:{
    showInterviewDetails(show){
      this.set('interViewDetails', show);
    },
    showEndInterview(show){
      this.set('modalEndInterview', show);
    },
    endInterview(status){
      let comment = this.get('comment');
      if ( comment && comment.length ) {
        //seteamos comentario
        Ember.set(this.get('interview'),'comments',[
          {
            uid:this.get('session.data.authenticated.userId'),
            text:  this.get('comment')
          }
        ])
      }
      this.sendAction('endInterview', status == "approved" || status == "rejected" ? status:null);
    },
    startInterview(){
      this.sendAction('startInterview');
    }
  }
});

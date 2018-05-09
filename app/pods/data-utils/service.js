import Ember from 'ember';
import Service from '@ember/service';
import md5 from 'ember-md5';

export default Service.extend({
  transform : {
    amount(cost){
      return {
        // icon:Alloy.CFG.design.icons.cur[cost.currency],
        amount: Math.round(cost.amount * 100) / 100, //redondeo 2 decimales
        text  :(Math.round(cost.amount * 100) / 100) + " " + cost.currency
      }
    },
    minToHours:function(min){
      //humanizeDuration en milisegundos
      return humanizeDuration(min*60000);
      // return moment.duration(min, "minutes").humanize();
    },
    convert12HourFormat:function(time) {
      return moment(checkValidDateHour(time), ["?Hmm"]).format("h:mm A");
    },
    languages:function(langs, i18n){
      var languages = "";
      langs.map(function(t,i){
        if (i) languages += ", ";
        languages+=i18n.t(`l_${t.lang}`)
      })
      return languages
    },
    convertTo24Hour:function(time) {
      return moment(time, ["h:mm A"]).format("HHmm");
    },
    getAdminProfileName(profile, appConstants) {
      let profileName = "Unknown";
      appConstants.adminProfiles.any(p => {
        if ( p.value == profile ) {
          profileName = p.name
          return true;
        } 
        return false;
      });
      return profileName;
    }
  },
  utils : {
    getGravatarImage(email){
      //paso 1 trim del email
      let emailL = email.trim();
      //paso 2 lowercase
      emailL = emailL.toLowerCase();
      //paso 3 md5
      return `https://www.gravatar.com/avatar/${md5(emailL)}?s=200&d=identicon`;
    }
  },
  validations : {
    emailValidation: [{
      message: 'Invalid email',
      validate: (inputValue) => {
        let emailPattern = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/;
        return Ember.isEmpty(inputValue) || emailPattern.test(inputValue);
      }
    }],
  }  
});

function checkValidDateHour(time){
  if ( time.toString().length < 4 ) {
    var diff = 4 -time.toString().length;
    for ( var i = 0; i<diff; i++ ) {
      time = "0"+time;
    }
  }
  return time;
}

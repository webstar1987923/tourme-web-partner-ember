import Ember from 'ember';
import Config from 'tourme-partner/config/environment';

let timeout   = 3000;
let namespace = Config.namespace;
let namespaceSrv = Config.namespaceSrv;
let host      = Config.host;
let modelUrl  = `${host}/${namespace}/`;
let srvUrl  = `${host}/${namespaceSrv}/`;

export default Ember.Service.extend({
  booking:{
    model:'bookings',
    details(id){
      let url = `${modelUrl}${this.model}/${id}/details`
      return modelRequest('bookings', url, 'GET');
    },
    solvedAttention(modelId){
      let data = {
        attention:false
      };
      let url = `${modelUrl}booking-histories/${modelId}`;
      return modelRequest('booking-histories', url, 'PUT', {"booking-history":data});
    }
  },
  rating:{
    model:'ratings',
    changeStatus(modelId, newStatus){
      let data = {
        status:newStatus
      };
      let url = `${modelUrl}${this.model}/${modelId}`;
      return modelRequest('ratings', url, 'PUT', {rating:data});
    },
  },
  message:{
    model:'messages',
    changeTo(modelId, to){
      let data = {
        to:to
      };
      let url = `${modelUrl}${this.model}/${modelId}`;
      return modelRequest('messages', url, 'PUT', {message:data});
    }
  },
  tour:{
    model:'tours',
    details(id){
      let url = `${modelUrl}${this.model}/${id}/details`
      return new Ember.RSVP.hash({
        model:modelRequest('tours', url, 'GET'),
        pictures:this.pictures(id, 'xl'),
        bookingsCount:this.bookingsCount(id),
        messagesCount:this.messagesCount(id),
      });
    },
    pictures(id, size){
      let url = `${modelUrl}${this.model}/${id}/pictures?size=${size}`
      return modelRequest('pictures', url, 'GET');
    },
    bookingsCount(id){
      let url = `${modelUrl}bookings/count?q={"tid":"${id}"}`;
      return modelRequest('bookings', url, 'GET');
    },
    messagesCount(id){
      let url = `${modelUrl}messages/count?q={"rid":"${id}"}`;
      return modelRequest('messages', url, 'GET');
    },
    update(model, fields){
      let data = {};
      fields.map(function(field){
        data[field]=model[field];
      });
      let url = `${modelUrl}${this.model}/${model._id}`;
      return modelRequest('tours', url, 'PUT', {tour:data});
    }
  },
  guide:{
    model:'users',
    details(id){
      return new Ember.RSVP.hash({
          pictures:this.pictures(id),
          toursCount:this.toursCount(id),
          bookingsCount:this.bookingsCount(id),
          messagesCount:this.messagesCount(id), 
          // ratingsCount:this.ratingsCount(id), 
      });
    },
    pictures(id){
      let url = `${modelUrl}${this.model}/${id}/pictures`;
      return modelRequest('pictures', url, 'GET');
    },
    toursCount(id){
      let url = `${modelUrl}tours/count?q={"uid":"${id}"}`;
      return modelRequest('tours', url, 'GET');
    },
    bookingsCount(id){
      let url = `${modelUrl}bookings/count?q={"uid":"${id}"}`;
      return modelRequest('bookings', url, 'GET');
    },
    messagesCount(id){
      let url = `${modelUrl}messages/count?q={"to.uid":"${id}"}`;
      return modelRequest('messages', url, 'GET');
    },
    ratingsCount(id){
      let url = `${modelUrl}ratings/count?q={"gid":"${id}"}`;
      return modelRequest('ratings', url, 'GET');
    },
    update(model, fields){
      let data = {};
      fields.map(function(field){
        data[field]=model.get(field);
      });
      let url = `${modelUrl}${this.model}/${model.id}`;
      return modelRequest('users', url, 'PUT', {user:data});
    }
  },
  user:{
    model:'users',
    details(id){
      return new Ember.RSVP.hash({
        bookingsCount:this.bookingsCount(id),
        messagesCount:this.messagesCount(id),
        // ratingsCount:this.ratingsCount(id)
      });
    },
    bookingsCount(id){
      let url = `${modelUrl}bookings/count?q={"uid":"${id}"}`;
      return modelRequest('bookings', url, 'GET');
    },
    messagesCount(id){
      let url = `${modelUrl}messages/count?q={"to.uid":"${id}"}`;
      return modelRequest('messages', url, 'GET');
    },
    ratingsCount(id){
      let url = `${modelUrl}ratings/count?q={"uid":"${id}"}`;
      return modelRequest('ratings', url, 'GET');
    },
    interviewCalendar(id){
      let url = `${modelUrl}interview-calendars?uid=${id}`;
      return modelRequest('interview-calendars', url, 'GET');
    },
    update(model, fields){
      let data = {};
      fields.map(function(field){
        data[field]=model.get(field);
      });
      let url = `${modelUrl}${this.model}/${model.get('id')}`;
      return modelRequest('users', url, 'PUT', {user:data});
    },
    forgotPwd(email){
      let data = {
        email:email
      };
      let url = `${modelUrl}${this.model}/forgotPwd`;
      return request(url, 'POST', data);
    },
    changePwd(currentPwd, newPwd){
      let data = {
        type:"email",
        current:currentPwd,
        new:newPwd
      };
      let url = `${modelUrl}${this.model}/changePwd`;
      return request(url, 'POST', data);
    },
    newUser(user){
      let url = `${modelUrl}${this.model}`;
      return modelRequest('users',url, 'POST', {user:user});
    },
    /**
     * Login user with email
     * @param {Object} user {{"email":{"login":login,"password":password}};}
     */
    login(user){
      let url = Config.urlLogin;
      return modelRequest('user',url, 'POST', {"user":user,"type":"mail"});
    },
    getUserByEmail(email){
      let url = `${modelUrl}${this.model}?email.login=${encodeURIComponent(email)}`;
      return modelRequest('users', url, 'GET');
    },
    setBackoffice(uid, backInfo){
      let url = `${modelUrl}${this.model}/${uid}`;
      var data = {
        'complete.backoffice':true
      }
      if ( backInfo ) data.backInfo = backInfo;
      return modelRequest('users', url, 'PUT', {user:data});
    },
    updateCalendar(calendarId, calendarData){
      let url = `${modelUrl}interview-calendars`;
      let method = "POST";
      if ( calendarId ) {
        method = "PUT";
        url += `/${calendarId}`;
      }
      return modelRequest('interview-calendars', url, method, {'interview-calendar':calendarData});
    },
    uploadImage(file, path){
      let url = `${srvUrl}storage/upload?reference=temporal`;
      return requestUpload(url, file, path);
    },
    updateProfilePicture:function(uid, data){
      let url = `${modelUrl}${this.model}/${uid}/picture`;
      return modelRequest('picture', url, 'POST',data);
    },
    setMainPicture:function(uid, pid){
      let url = `${modelUrl}${this.model}/${uid}/pictures/${pid}`;
      return modelRequest('picture', url, 'POST');
    },
    changeProfilePic:function(uid, file){
      let that = this;
      return new Ember.RSVP.Promise(function(resolve,reject){
        // Subimos la nueva
        that.uploadImage(file, "foto.jpg").then(resp=>{
          //asignamos la imagen al usuario
          that.updateProfilePicture(uid, resp).then(picture=>{
            //seteamos la foto como foto principal
            that.setMainPicture(uid, picture._id).then(picture=>{
              resolve(picture.url)
            }).catch(err=>{
              reject(err);
            });
          }).catch(err=>{
            reject(err);
          });
        }).catch(err=>{
          reject(err);
        });
      });   
    }
  }
});

//Función genérica para todos los request
//Falta ampliar (basranos un poco a como tenemos en Titanium)
function modelRequest(expected, url, method, data){
  return new Ember.RSVP.Promise(function(resolve,reject){
    request(url,method,data).then(response =>{
      if (!Ember.isNone(response[expected])) resolve(response[expected]); //Devuelve el resultado del modelo esperado
      else reject("Error: Invalid Response")
    }).catch(reject)
  });    
}

function request(url, method, data){
  return new Ember.RSVP.Promise(function(resolve,reject){
    var request = {
      url     :url,
      type    :method,
      timeout :timeout
    };
    if ( data ) {
      request.data = JSON.stringify(data);
      request.contentType = 'application/json;charset=utf-8';
      request.dataType = 'json';
    }
    Ember.$.ajax(request).then(response =>{
      resolve(response); //Devuelve el resultado del modelo esperado
    }).catch(reject)
  });    
}

function requestUpload(url, file, path){
  return new Ember.RSVP.Promise(function(resolve,reject){
    var formData = new FormData();
    formData.append("fileUpload", file);
    formData.append("path", path);
    var request = {
      url: url,
      type:'POST',
      data: formData,
      cache:false,
      contentType: false,
      processData: false,
      timeout:15000
    }
    Ember.$.ajax(request).then(response =>{
      resolve(response); //Devuelve el resultado del modelo esperado
    }).catch(reject)
  });
}

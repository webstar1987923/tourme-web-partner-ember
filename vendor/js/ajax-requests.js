$.ajaxSetup({
    crossDomain:true,
    xhrFields: {
        withCredentials: true
    },
});
/*
    Petición de perfil a facebook
*/
function ajaxRequestFacebookLogin(accessToken){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url:'https://graph.facebook.com/me?fields=picture,name,first_name&access_token='+accessToken,
            type:'Get',
            crossDomain:false,
            xhrFields: {
                withCredentials: false
            },
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

/*
    Petición de perfil a google
*/
function ajaxRequestGoogleLogin(code, client_id, client_secret){
    var data = {
        code:code,
        client_id:client_id,
        client_secret:client_secret,
        grant_type:"authorization_code",
        redirect_uri:"http://localhost:4200"
    };
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url:'https://www.googleapis.com/oauth2/v4/token',
            type:'POST',
            data: data,
            contentType: 'application/x-www-form-urlencoded',
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

function ajaxRequestGoogleProfile(access_token){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url:'https://www.googleapis.com/plus/v1/people/me?access_token='+access_token,
            type:'Get',
            crossDomain:false,
            xhrFields: {
                withCredentials: false
            },
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}
/*
    Login a2s con facebook
*/
function ajaxRequestA2sLoginExternal(url, type, userId, accessToken, pic){
    var user = {};
    user[type] = {"id":userId,"token":accessToken};
    if ( !Ember.isNone(pic) ) {
        user.pic = pic;
    }
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url:url,
            type:'POST',
            data: JSON.stringify({'user':user,"type":type}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

/*
    Login a2s con email
*/
function ajaxRequestA2sLoginEmail(url, login, password){
    var user = {"email":{"login":login,"password":password}};
    console.log("ajax ", user)
    console.log(url);
    
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify({'user':user,"type":"mail"}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            console.log("respuesta de ajax")
            resolve(response);
        }, function(error){
            console.log("Error respuesta de ajax", error)
            reject(error);
        });
    });
}

/*
    Login a2s con username
*/
function ajaxRequestA2sLoginUsername(url, login, password){
    var user = {"uname":login,"password":password};

    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify({'user':user,"type":"uname"}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

/*
    Registro
*/
function ajaxRequestA2sRegister(url, user){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify({'user':user}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}


/*
    Login app de prueba
*/
function ajaxRequestLoginUsername(url, login, password){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify({'user':{"uname":login,"password":password},"type":"uname"}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            crossDomain:true,
            xhrFields: {
                withCredentials: true
            },
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}



function ajaxRequestPushSend(url, push, data, certId, timeOut){
    var object = {'to':push,"data":data};
    if ( !Ember.isNone(certId) ) object.certId = certId;
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify(object),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            crossDomain:true,
            timeout: timeOut
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

/*
    GET genérico a una url
*/
function ajaxRequestGet(url, timeOut){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'GET',
            timeout: timeOut
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

function ajaxRequestPost(url, data, timeout){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            timeout: timeout || 300000,
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

function ajaxRequestPut(url, data, timeout){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'PUT',
            timeout: timeout || 300000,
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

function ajaxRequestDelete(url, timeout){
    return new Ember.RSVP.Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'DELETE',
            timeout: timeout || 300000,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}

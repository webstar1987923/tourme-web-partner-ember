import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
//import Config from 'tourme-partner/config/environment';
import { inject as service } from '@ember/service';

export default OAuth2PasswordGrant.extend({
	remote: service(),
	authenticate(identification, password) { //, scope = []
		return new Ember.RSVP.Promise((resolve, reject) => {

			this.get('remote').user.login({"email":{"login":identification,"password":password}}
			).then(user=>{			
				if ( !Ember.isNone(user.email) && !Ember.isNone(user._id) ) {
					//En función de la respuesta resolveremos para autenticar la sesión
					//a la sessión le hace falta un token para quedar autenticada y que al refrescar la página siga estando logueado
					//si no viene ponemos uno inventado o generamos uno aleatorio ya que no lo queremos para nada más
					let accessToken = Ember.isNone(user.accessToken) ? "123456" : user.accessToken;
					var resp = {access_token:accessToken, userId: user._id, email:user.email.login};
					if (user.complete.guide){
						if ( !Ember.isNone(user.name) ) {
							resp['name'] = user.name;
						}
						if ( !Ember.isNone(user.firstName) ) {
							resp['firstName'] = user.firstName;
						}
						if ( !Ember.isNone(user.pic) ) {
							resp['picture'] = user.pic;
						}
						if ( !Ember.isNone(user.backInfo.profile) ) {
							resp['profile'] = user.backInfo.profile;
						}							
						resolve(resp);
					}else{
						reject({responseJSON:{message:"User not Authorized!"}})
					}
				}				
			}).catch(reject)
		});
	},
});

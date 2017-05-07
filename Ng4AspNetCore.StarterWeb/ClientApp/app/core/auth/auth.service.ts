import { Inject, Injectable } from '@angular/core';
import { B2CSettings } from './b2c.settings';
import * as hellojs from '../../../lib/hello.all.js';
declare var hello: HelloJSStatic;

@Injectable()
export class AuthService {

	signInPolicy: string = "azureAdB2cSignIn";
	signInSignUpPolicy: string = "azureAdB2cSignInSignUp";
	editProfilePolicy: string = "azureAdB2cEditProfile";

	isAuthenticated: boolean = false;

	constructor( @Inject('b2cSettings') private b2cSettings: B2CSettings) {

		((hello) => {
			var settings: any = {
				"azureAdB2cSignIn": {
					name: "Azure Active Directory B2C",
					oauth: {
						version: 2,
						auth: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.signInPolicyName + "/oauth2/v2.0/authorize",
						grant: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.signInPolicyName + "/oauth2/v2.0/token"
					},
					refresh: true,
					scope_delim: ' ',
					logout: function (p) {
						//get id_token from auth response
						var id_token = hello(this.signInPolicy).getAuthResponse().id_token;
						//clearing local storage session
						(hello as any).utils.store(this.signInPolicy, null);

						//redirecting to Azure B2C logout URI
						window.location.href = "https://login.microsoftonline.com/" + b2cSettings.tenantName + "/oauth2/v2.0/logout?p=" + b2cSettings.signInPolicyName + "&id_token_hint=" +
							id_token + "&post_logout_redirect_uri=" + b2cSettings.redirect_uri;
					},
					xhr: function (p) {
						if (p.method === 'post' || p.method === 'put') {
							//toJSON(p);
							if (typeof (p.data) === 'object') {
								// Convert the POST into a javascript object
								try {
									p.data = JSON.stringify(p.data);
									p.headers['content-type'] = 'application/json';
								} catch (e) { }
							}
						} else if (p.method === 'patch') {
							(hello as any).utils.extend(p.query, p.data);
							p.data = null;
						}
						return true;
					},
					// Don't even try submitting via form.
					// This means no POST operations in <=IE9
					form: false
				}
			};

			hello.init(settings);
		})(hello);

		((hello) => {
			var settings: any = {
				"azureAdB2cSignInSignUp": {
					name: 'Azure Active Directory B2C',
					oauth: {
						version: 2,
						auth: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.signInSignUpPolicyName + "/oauth2/v2.0/authorize",
						grant: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.signInSignUpPolicyName + "/oauth2/v2.0/token"
					},
					refresh: true,
					scope_delim: ' ',
					logout: function () {
						//get id_token from auth response
						var id_token = hello(this.signInSignUpPolicy).getAuthResponse().id_token;
						//clearing local storage session
						(hello as any).utils.store(this.signInSignUpPolicy, null);

						//redirecting to Azure B2C logout URI
						window.location.href = "https://login.microsoftonline.com/" + b2cSettings.tenantName + "/oauth2/v2.0/logout?p=" + b2cSettings.signInSignUpPolicyName + "&id_token_hint=" +
							id_token + "&post_logout_redirect_uri=" + b2cSettings.redirect_uri;
					},
					xhr: function (p) {
						if (p.method === 'post' || p.method === 'put') {
							//toJSON(p);
							if (typeof (p.data) === 'object') {
								// Convert the POST into a javascript object
								try {
									p.data = JSON.stringify(p.data);
									p.headers['content-type'] = 'application/json';
								} catch (e) { }
							}
						} else if (p.method === 'patch') {
							(hello as any).utils.extend(p.query, p.data);
							p.data = null;
						}
						return true;
					},
					// Don't even try submitting via form.
					// This means no POST operations in <=IE9
					form: false
				}
			};

			hello.init(settings);
		})(hello);

		((hello) => {
			var settings: any = {
				"azureAdB2cEditProfile": {
					name: 'Azure Active Directory B2C',
					oauth: {
						version: 2,
						auth: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.editProfilePolicyName + "/oauth2/v2.0/authorize",
						grant: "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantName + "/" + b2cSettings.editProfilePolicyName + "/oauth2/v2.0/token"
					},
					refresh: true,
					scope_delim: ' ',
					logout: function (p) {
						//get id_token from auth response
						var id_token = hello(this.editProfilePolicy).getAuthResponse().id_token;
						//clearing local storage session
						(hello as any).utils.store(this.editProfilePolicy, null);

						//redirecting to Azure B2C logout URI
						window.location.href = "https://login.microsoftonline.com/" + b2cSettings.tenantName + "/oauth2/v2.0/logout?p=" + b2cSettings.editProfilePolicyName + "&id_token_hint=" +
							id_token + "&post_logout_redirect_uri=" + b2cSettings.redirect_uri;
					},
					xhr: function (p) {
						if (p.method === 'post' || p.method === 'put') {
							//toJSON(p);
							if (typeof (p.data) === 'object') {
								// Convert the POST into a javascript object
								try {
									p.data = JSON.stringify(p.data);
									p.headers['content-type'] = 'application/json';
								} catch (e) { }
							}
						} else if (p.method === 'patch') {
							(hello as any).utils.extend(p.query, p.data);
							p.data = null;
						}
						return true;
					},
					// Don't even try submitting via form.
					// This means no POST operations in <=IE9
					form: false
				}
			};

			hello.init(settings);
		})(hello);

		hello.init({
			"azureAdB2cSignIn": b2cSettings.clientId,
			"azureAdB2cSignInSignUp": b2cSettings.clientId,
			"azureAdB2cEditProfile": b2cSettings.clientId
		},
			{
				redirect_uri: b2cSettings.redirect_uri,
				scope: "openid " + b2cSettings.clientId,
				response_type: "token id_token"
			});

		hello.on("auth.login", (auth: any) => {
			var authResponse = hello(auth.network).getAuthResponse();
			if (this.online(authResponse)) {
				console.log("logged in.");
				this.isAuthenticated = true;
			}
		});

		hello.on("auth.logout", (auth: any) => {
			if (!this.online(hello(auth.network).getAuthResponse())) {
				console.log("logged out.");
				this.isAuthenticated = false;
			}
		});
	}

	online(session) {
		var currentTime = (new Date()).getTime() / 1000;
		return session && session.access_token && session.expires > currentTime;
	};

	login(policy: string, displayType: string) {
		console.log('logging in.');

		//in case of silent renew, check if the session is still active otherwise ask the user to login again
		if (!this.online(hello(policy).getAuthResponse()) && displayType === "none") {
			this.login(policy, "page");
			return;
		}

		hello(policy).login({ display: displayType });
	}

	logout(policy: string) {
		console.log('logging out.');

		if (this.online(hello(policy).getAuthResponse())) {
			hello.logout(policy);
		}
	}
}

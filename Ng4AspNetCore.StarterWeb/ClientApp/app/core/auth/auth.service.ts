///<reference path="../../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';
import { B2CSettings } from './b2c.settings';

@Injectable()
export class AuthService {

	clientApp: Msal.UserAgentApplication;
	
	userName: string;

	signInPolicy: string = "azureAdB2cSignIn";
	signInSignUpPolicy: string = "azureAdB2cSignInSignUp";
	editProfilePolicy: string = "azureAdB2cEditProfile";

	isAuthenticated: boolean = false;

	constructor( @Inject('b2cSettings') private b2cSettings: B2CSettings) {
		var self = this;
		var authority: string = "https://login.microsoftonline.com/tfp/" + b2cSettings.tenantId + "/" + b2cSettings.policyName + "/";
		this.clientApp = new Msal.UserAgentApplication(b2cSettings.clientId, authority, (errorDesc: string, token: string, error: string, tokenType: string) => {
			var scopedClientApp = window.msal as Msal.UserAgentApplication;
			if (token) {
				scopedClientApp.acquireTokenSilent(self.b2cSettings.scopes).then((accessToken: string) => {
					self.isAuthenticated = true;
					var foo = Msal.Utils.extractIdToken(accessToken);
				}, (error) => {
					console.log(error);
					scopedClientApp.acquireTokenPopup(self.b2cSettings.scopes).then((accessToken: string) => {
						self.isAuthenticated = true;
						var foo = Msal.Utils.extractIdToken(accessToken);
					}, (error) => {
						console.log(error);
					});
				});
			}
			else if (errorDesc || error) {
				console.log(error + ':' + errorDesc);
			}
		});
	}

	login(policy: string, displayType: string) {
		this.clientApp.loginRedirect(this.b2cSettings.scopes);
	} 

	logout(policy: string) {
		this.clientApp.logout();
	}
}

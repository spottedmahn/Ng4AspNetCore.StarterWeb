///<reference path="../../../../node_modules/msal/out/msal.d.ts" />
import { Inject, Injectable } from '@angular/core';


import { AuthSettings } from './auth.settings';
import { AuthIdentity } from './auth.identity';

@Injectable()
export class AuthService {

	userAgentApp: Msal.UserAgentApplication;
	identity: AuthIdentity;

	isAuthenticated: boolean = false;

	constructor( @Inject('authSettings') private authSettings: AuthSettings) {
		var self = this;
		var authority: string = "https://login.microsoftonline.com/tfp/" + authSettings.tenantId + "/" + authSettings.policyName + "/";

		this.userAgentApp = new Msal.UserAgentApplication(authSettings.clientId, authority, (errorDesc: string, token: string, error: string, tokenType: string) => {
			var scopedUserAgentApp = window.msal as Msal.UserAgentApplication;
			if (token) {
				scopedUserAgentApp.acquireTokenSilent(self.authSettings.scopes).then((accessToken: string) => {

					// Update status.
					self.setAuthenticated(accessToken);
					
				}, (error) => {
					console.log(error);
					scopedUserAgentApp.acquireTokenPopup(self.authSettings.scopes).then((accessToken: string) => {

						// Update status.
						self.setAuthenticated(accessToken);

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

	login() {
		this.userAgentApp.loginRedirect(this.authSettings.scopes);
	} 

	logout() {
		this.userAgentApp.logout();
	}

	private setAuthenticated(accessToken: string) {
		// Update the UI.
		this.isAuthenticated = true;
		this.identity = Msal.Utils.extractIdToken(accessToken) as AuthIdentity;
		this.identity.displayName = this.identity.given_name + ' ' + this.identity.family_name;
	}
}

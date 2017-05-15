import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';


@Injectable()
export class DefaultRequestOptionsService extends BaseRequestOptions {

	constructor() {
		super();

		this.headers.set("Content-Type", "application/json");
		this.headers.set("Accept", "application/json");
	}

	merge(options?: RequestOptionsArgs): RequestOptions {
		var result = super.merge(options);
		var accessToken = sessionStorage.getItem("msal.idtoken");
		if (accessToken) {
			result.headers.set("Authorization", "Bearer " + accessToken);
		}
		return result;
	}
}

export const RequestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptionsService };
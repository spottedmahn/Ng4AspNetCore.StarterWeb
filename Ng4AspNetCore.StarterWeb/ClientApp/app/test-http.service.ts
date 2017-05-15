import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TestHttpService {

	constructor(private http: Http) { }

	getValues(): Observable<string[]>  {
		return this.http.get("api/values")
			.map(this.extractValues)
			.catch(this.handleError);
	}

	private extractValues(res: Response): string[] {
		var empty: string[] = [];

		var data = res.json();
		return data || empty;
	}

	private handleError(error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}

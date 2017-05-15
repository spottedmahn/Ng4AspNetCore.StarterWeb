import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';


import { TestHttpService } from './test-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';
	values: string[];

	constructor(private testHttpService: TestHttpService) { }

	getValues() {
		this.testHttpService.getValues()
			.subscribe(values => {
				this.values = values;
			});
	}

}

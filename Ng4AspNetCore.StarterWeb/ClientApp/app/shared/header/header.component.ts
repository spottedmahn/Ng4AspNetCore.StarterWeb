import { Inject, Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { AuthService } from '../../core/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public authService: AuthService) { }

	ngOnInit() {
	}

	login(): void {
		this.authService.login();
	}

	logout(): void {
		this.authService.logout();
	}
}

import { Inject, Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { B2CSettings } from '../../core/auth/b2c.settings';
import { AuthService } from '../../core/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor( @Inject('b2cSettings') private b2cSettings: B2CSettings, public authService: AuthService) { }

	ngOnInit() {
	}

	login(): void {
		this.authService.login(this.authService.signInSignUpPolicy, "page");
	}

	logout(): void {
		this.authService.logout(this.authService.signInSignUpPolicy);
	}
}

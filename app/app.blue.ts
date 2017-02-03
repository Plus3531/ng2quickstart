import { Component } from '@angular/core';
import { DatabaseService } from './service/database.service';

@Component({
	selector: 'sw-blue',
	providers: [DatabaseService],
	template: `
   <div>try await/async</div>
   <button (click)="doAwaitAsync()">doAwaitAsync</button>
    `
})
export class BlueComponent {
	constructor(private databaseService: DatabaseService) { }
	async doAwaitAsync() {
		let myN = await this.databaseService.getStuff();
		console.log(JSON.stringify(myN);
	}
}
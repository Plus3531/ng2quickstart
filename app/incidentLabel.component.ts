import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import {IncidentLabelDisplay} from './model/database.model';
import {DatabaseService} from './service/database.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'sw-incidentLabel',
	providers: [DatabaseService],
	template: `<button (click)="onClick($event)">IncidentLabel</button>
	<div *ngIf="incidentLabelTbl.length > 0">
	<table  style="width:100%">
  <tr>
    <th>name</th><th>Incident Category</th><th>Situator Category</th>
  </tr>
  <tr *ngFor="let row of incidentLabelTbl">
    <td >{{row.name}}</td><td >{{row.incidentCategoryDisp}}</td><td >{{row.situatorCategoryDisp}}</td>
  </tr>
</table>
</div>
    `
})
export class IncidentLabelComponent {
	constructor(private http: Http, private databaseService: DatabaseService) { }
//	private item : Array<IncidentLabelDisplay> = null;
	private ilUrl = 'http://localhost:4412/api/IncidentLabel';
	public result: string;
	private incidentLabelTbl: Array<IncidentLabelDisplay>;
	subscription: Subscription;
ngOnInit() {
		this.subscription = this.databaseService.ilds.subscribe(arr => {
			this.incidentLabelTbl = arr;
		})
  }

	onClick(event: any) {
		this.databaseService.getDisplayIncidentLabels();
	}
}

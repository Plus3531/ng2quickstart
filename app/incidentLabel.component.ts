import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {IncidentLabel} from './model/incidentLabel.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'sw-incidentLabel',
	template: `<button (click)="onClick($event)">IncidentLabel</button>
	<table style="width:100%">
  <tr>
    <th>name</th>
  </tr>
  <tr *ngFor="let row of incidentLabelTbl">
    <td >{{row.name}}</td>
  </tr>
</table>
    `
})
export class IncidentLabelComponent {
	constructor(private http: Http) { }
	private ilUrl = 'http://localhost:4412/api/my';
	public result: string;
	private incidentLabelTbl: Array<IncidentLabel>;
	onClick(event: any) {
		this.http.get(this.ilUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')).subscribe(jsonResult => {
				this.incidentLabelTbl=jsonResult;
			});

	}
}

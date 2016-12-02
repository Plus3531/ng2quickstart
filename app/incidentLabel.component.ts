import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'sw-incidentLabel',
	template: `<button (click)="onClick($event)">IncidentLabel</button>
	{{result}}
    `
})
export class IncidentLabelComponent {
	constructor(private http: Http) { }
	private ilUrl = 'http://localhost:4412/api/my';
	public result: string;
	onClick(event: any) {
		this.http.get(this.ilUrl)
			.map((res: Response) => res.json())
			//...errors if any
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')).subscribe(jsonResult => {
				this.result = JSON.stringify(jsonResult);
			});

	}
}

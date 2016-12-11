import { Injectable, EventEmitter } from '@angular/core';
import { IncidentLabelDisplay, IncidentLabel, IncidentCaterory, SituatorCaterory } from '../model/database.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';


function resolveIcIncidentLabels(ild: IncidentLabelDisplay) {
	let lookupIc = this.find(function (ic: IncidentCaterory) {
		return ild.incidentCategory == ic.id;
	});
	if (lookupIc) {
		ild.incidentCategoryDisp = lookupIc.name;
	}
	return ild;
}

function resolveScIncidentLabels(ild: IncidentLabelDisplay) {
	let lookupSc = this.find(function (sc: SituatorCaterory) {
		return ild.situatorCategory == sc.id;
	});
	if (lookupSc) {
		ild.situatorCategoryDisp = lookupSc.name;
	}
	return ild;
}
@Injectable()
export class DatabaseService {
	constructor(private http: Http) { }
	private incidentLabelsChange: EventEmitter<Array<IncidentLabelDisplay>> = new EventEmitter<Array<IncidentLabelDisplay>>();
	private _ilds: BehaviorSubject<Array<IncidentLabelDisplay>> = new BehaviorSubject([]);
	public ilds: Observable<Array<IncidentLabelDisplay>> = this._ilds.asObservable();
	private ilUrl = 'http://localhost:4412/api/IncidentLabel';
	private icUrl = 'http://localhost:4412/api/IncidentCategory';
	private scUrl = 'http://localhost:4412/api/SituatorCategory';
	private incidentLabels: Array<IncidentLabelDisplay>;
	private incidentCategories: Array<IncidentCaterory>;
	private situatorCategories: Array<SituatorCaterory>;

	getIncidentLabelsChangeEmitter() {
		return this.incidentLabelsChange;
	}
	getDisplayIncidentLabels() {

		let requests: Array<any> = [];
		requests.push(this.http.get(this.ilUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')));
		requests.push(this.http.get(this.icUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')));
		requests.push(this.http.get(this.scUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error')));
		Observable.forkJoin(requests).subscribe((result) => {
			this.incidentLabels = result[0] as IncidentLabelDisplay[];
			this.incidentCategories = result[1] as IncidentCaterory[];
			this.situatorCategories = result[2] as SituatorCaterory[];
			//get fks
			this.incidentLabels = this.incidentLabels.map(resolveIcIncidentLabels, this.incidentCategories);
			this.incidentLabels = this.incidentLabels.map(resolveScIncidentLabels, this.situatorCategories);
			
			this._ilds.next(this.incidentLabels);

		});

		return this.incidentLabels;

		// let ild: IncidentLabelDisplay[] = [{
		// 	name: 'pjTest',
		// 	abbreviation: 'jp',
		// 	canBeSubincident: false,
		// 	id: 6,
		// 	description: 'je zus',
		// 	incidentCategory: 3,
		// 	incidentCategoryDisp: 'incidentcatDisppp',
		// 	situatorCategory: 23,
		// 	situatorCategoryDisp: 'sitCatDispp',
		// 	standardPrognosis: 8
		// }]
		// return ild;
	}
}
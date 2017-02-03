import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { IncidentLabelDisplay, IncidentCategory, IncidentLabel } from './model/database.model';
import { DatabaseService } from './service/database.service';

// Import RxJs required methods
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Component({
	selector: 'sw-incidentLabel',
	providers: [DatabaseService],
	template: `
<button (click)="getIncidentLabels($event)">IncidentLabel</button>
<p-dataTable [value]="incidentLabelTbl" [rows]="20" [paginator]="true" [pageLinks]="3" [rowsPerPageOptions]="[10,20,50]" [responsive]="true" [globalFilter]="gb">
 <header>List of IncidentLabels</header>
	<p-column [style]="{'width':'50px'}" [filter]="false">
		<template let-cil="rowData" pTemplate type="body">
			<span class="fa fa-pencil handStyle" (click)="edit(cil)"></span><span> </span><span class="fa fa-remove handStyle" (click)="remove($event)"></span>
		</template>
	</p-column>
	<p-column field="name" header="Name" filterMatchMode="contains" [filter]="true" [sortable]="true"></p-column>
	<p-column field="abbreviation" header="Abbreviation" [filter]="true"></p-column>
	<p-column field="standardPrognosis" header="StandardPrognosis" [filter]="true"></p-column>
	<p-column field="description" header="Description" [filter]="true"></p-column>
	<p-column field="canBeSubincident" header="CanBeSubincident" [style]="{'width':'80px'}" [filter]="true"></p-column>
	<p-column field="incidentCategoryDisp" header="Incident Category" [filter]="true"></p-column>
	<p-column field="situatorCategoryDisp" header="Situator Category" [filter]="true"></p-column>
</p-dataTable>

<p-dialog header="IncidentLabel" [(visible)]="displayDialog" responsive="true" modal="true" width="600">
	<div class="ui-grid ui-grid-responsive ui-fluid" *ngIf="cil">
		<div class="ui-grid-row">
			<div class="ui-grid-col-3"><label style="text-align:right;width:100%" for="cil.name">Name</label></div>
			<div class="ui-grid-col-9"><input type="text" style="width:100%" pInputText id="cil.name" [(ngModel)]="cil.name" /></div>
		</div>
		<div class="ui-grid-row">
			<div class="ui-grid-col-3"><label style="text-align:right;width:100%" for="cil.ic">Incident Category</label></div>
			<div class="ui-grid-col-9">
			<select style="width:100%;height:25px" [(ngModel)]="cic" id="cil.ic">
				<option *ngFor="let c of incidentCategoryTbl" [ngValue]="c">{{c.name}}</option>
			</select>
			</div>
		</div>
		<div class="ui-grid-row">
			<div class="ui-grid-col-3"><label style="text-align:right;width:100%" for="cil.description">Description</label></div>
			<div class="ui-grid-col-9"><textarea rows="5" cols="30" pInputTextarea id="cil.description" [(ngModel)]="cil.description"></textarea></div>
		</div>
	</div>
	<footer>
		<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
			<button (click)="saveEdits()">Save</button>
		</div>
	</footer>
</p-dialog>		
    `,
	styles: [`
		.handStyle {cursor:pointer}
	`]
})
export class IncidentLabelComponent {
	constructor(private databaseService: DatabaseService) { }
	//	private item : Array<IncidentLabelDisplay> = null;
	private ilUrl = 'http://localhost:4412/api/IncidentLabel';
	public result: string;
	private incidentLabelTbl: Array<IncidentLabelDisplay>;
	private incidentCategoryTbl: Array<IncidentCategory>;
	private cil: IncidentLabelDisplay;
	private cic: IncidentCategory;
	displayDialog: boolean;
	subscription: Subscription;
	ngOnInit() {
		this.subscription = this.databaseService.ilds.subscribe(arr => {
			this.incidentLabelTbl = arr;
		});
		this.databaseService.ics.subscribe(arr => {
			this.incidentCategoryTbl = arr;
		});
		//load incidentlabels
		this.getIncidentLabels(undefined);
	}

	getIncidentLabels(event: any) {
		this.databaseService.getDisplayIncidentLabels();
	}

	remove(event: any) {
		alert(JSON.stringify(event));
	}
	edit(cil: IncidentLabelDisplay) {
		this.cil = cil;
		this.cic = this.incidentCategoryTbl.find(ic => ic.id == cil.incidentCategory);
		//alert(JSON.stringify(cil));
		this.displayDialog = true;
	}
	saveEdits() {
		let incidentLabel = <IncidentLabel>{};
		this.cil.incidentCategory = this.cic.id;
		this.cil.incidentCategoryDisp = this.cic.name;
		incidentLabel.abbreviation = this.cil.abbreviation;
		incidentLabel.canBeSubincident = this.cil.canBeSubincident;
		incidentLabel.description = this.cil.description;
		incidentLabel.id = this.cil.id;
		incidentLabel.incidentCategory = this.cic.id;
		incidentLabel.name = this.cil.name;
		incidentLabel.situatorCategory = this.cil.situatorCategory;
		incidentLabel.standardPrognosis = this.cil.standardPrognosis;
		this.databaseService.putIncidentLabel(incidentLabel);
		this.displayDialog = false;
	}
}

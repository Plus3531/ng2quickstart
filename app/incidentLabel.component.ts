import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { IncidentLabelDisplay } from './model/database.model';
import { DatabaseService } from './service/database.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'sw-incidentLabel',
	providers: [DatabaseService],
	template: `
		<button (click)="getIncidentLabels($event)">IncidentLabel</button>
		<p-dataTable [value]="incidentLabelTbl">
			<p-column [style]="{'width':'50px'}">
				<template let-cil="rowData" pTemplate type="body">
					<span class="fa fa-pencil handStyle" (click)="edit(cil)"></span><span> </span><span class="fa fa-remove handStyle" (click)="remove($event)"></span>
				</template>
			</p-column>
			<p-column field="name" header="Name" [sortable]="true"></p-column>
			<p-column field="abbreviation" header="Abbreviation"></p-column>
			<p-column field="standardPrognosis" header="StandardPrognosis"></p-column>
			<p-column field="description" header="Description"></p-column>
			<p-column field="canBeSubincident" header="CanBeSubincident" [style]="{'width':'80px'}"></p-column>
			<p-column field="incidentCategoryDisp" header="Incident Category"></p-column>
			<p-column field="situatorCategoryDisp" header="Situator Category"></p-column>
		</p-dataTable>

<p-dialog header="IncidentLabel" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" width="500">
    <div class="ui-grid ui-grid-responsive ui-fluid" *ngIf="cil">
        <div class="ui-grid-row">
            <div class="ui-grid-col-4"><label for="cil.name">Name</label></div>
            <div class="ui-grid-col-8"><input pInputText id="cil.name" [(ngModel)]="cil.name" /></div>
        </div>
    </div>
    <footer>
        <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
            <button type="button" pButton icon="fa fa-check" (click)="save()" label="Save"></button>
        </div>
    </footer>
</p-dialog>		
    `,
	styles: [`
		.handStyle {cursor:pointer}
	`]
})
export class IncidentLabelComponent {
	constructor(private http: Http, private databaseService: DatabaseService) { }
	//	private item : Array<IncidentLabelDisplay> = null;
	private ilUrl = 'http://localhost:4412/api/IncidentLabel';
	public result: string;
	private incidentLabelTbl: Array<IncidentLabelDisplay>;
	private cil: IncidentLabelDisplay;
	displayDialog: boolean;
	subscription: Subscription;
	ngOnInit() {
		this.subscription = this.databaseService.ilds.subscribe(arr => {
			this.incidentLabelTbl = arr;
		})
	}

	getIncidentLabels(event: any) {
		this.databaseService.getDisplayIncidentLabels();
	}

	remove(event: any) {
		alert(JSON.stringify(event));
	}
	edit(cil: IncidentLabelDisplay) {
		this.cil = cil;
		//alert(JSON.stringify(cil));
		this.displayDialog = true;
	}

}

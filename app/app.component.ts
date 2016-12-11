import { Component } from '@angular/core';
import { SelectComponent } from 'ng2-select';
//import { IncidentLabelComponent } from './incidentLabel.component'; //je hoeft hier niet te importeren omdat de component in app.module is toegevoegd aan de module

@Component({
    selector: 'my-app',
    template: `<h1>My Second Angular App</h1>
    <input type="text" pInputText/>
    <sw-incidentLabel></sw-incidentLabel>
    <div class="select-style">
      <select [ngModel]="selectedDeviceObj" (ngModelChange)="onChangeObj($event)" name="sel3">
    <option [ngValue]="i" *ngFor="let i of deviceObjects">{{i.name}}</option>
  </select>
  </div>
  <div>
    <ng-select
                [multiple]="true"
                [items]="filterItems"
                (data)="setFilterSelection($event)"
                placeholder="Click or type to filter">
        </ng-select> 
        </div>
  {{selectedDeviceObj | json}}

   <ng-select [allowClear]="false"
              [items]="items"
              [disabled]="disabled"
              (data)="refreshValue($event)"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (typed)="typed($event)"
              placeholder="No city selected">
  </ng-select>

    `,
    styles: [`
    .select-style { }
    .select-style select { }
  `]
})
export class AppComponent {
     private filterSelection: string[];
    public filterItems: string[] = ["alpha","beta","gamma"];
    public setFilterSelection(value: any): void {
        this.filterSelection = value;
    }

    deviceObjects = [{ name: 'Sooorweb', id: 3 }, { name: 'Prorail', id: 1 }, { name: 'Geodan', id: 2 }];
    selectedDeviceObj = this.deviceObjects[1];
    onChangeObj(newObj: any) {
        console.log(newObj);
        this.selectedDeviceObj = newObj;
        // ... do other stuff here ...
    }
   public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }
}

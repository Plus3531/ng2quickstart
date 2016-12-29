import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'my-app',
    template:  `
        <div>
            <p>
                <a routerLink="/red"   routerLinkActive="disabled">Red</a> |
                <a routerLink="/green" routerLinkActive="disabled">Green</a> |
                <a routerLink="/blue"  routerLinkActive="disabled">Blue</a>
            </p>
            <div class="border not-padded">
                <router-outlet></router-outlet>
            </div>    
        </div>`,
    styles: [`
        div {padding: 10px;}
        .not-padded {padding: 0;}
        .border {border: 1px solid #b3b3b3;}
        .disabled {
            pointer-events: none; 
            cursor: default;
            color: #404040;
            text-decoration: none;
        }`
    ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
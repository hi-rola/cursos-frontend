import { Component } from '@angular/core';

@Component({
  selector: 'shared-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  sideNavStatus: boolean = false;
}

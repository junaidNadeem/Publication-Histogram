import {Component, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'europe-pmc',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}

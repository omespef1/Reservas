import { Component } from '@angular/core';

/**
 * Generated class for the WaitingClockComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'waiting-clock',
  templateUrl: 'waiting-clock.html'
})
export class WaitingClockComponent {

  text: string;

  constructor() {
    //console.log('Hello WaitingClockComponent Component');
    this.text = 'Hello World';
  }

}

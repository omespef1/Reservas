import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the DigitalDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'digitalDate',
})
export class DigitalDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let date = new Date(moment(value).toISOString())
    value = moment(date).format("HH:mm");
    return value;
  }
}

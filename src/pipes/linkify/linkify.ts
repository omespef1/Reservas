import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';
/**
 * Generated class for the LinkfyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(str: string): string {
    return str ? linkifyStr(str, {target: '_system'}) : str;
  }
}

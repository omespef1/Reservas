import { NgModule } from '@angular/core';
import { DigitalDatePipe } from './digital-date/digital-date';
import { LongDatePipe } from './long-date/long-date';
import { LinkifyPipe } from './linkify/linkify';
@NgModule({
	declarations: [DigitalDatePipe,
    DigitalDatePipe,
    LongDatePipe,
    LinkifyPipe],
	imports: [],
	exports: [DigitalDatePipe,
    DigitalDatePipe,
    LongDatePipe,
    LinkifyPipe]
})
export class PipesModule {}

import { NgModule } from '@angular/core';
import { DigitalDatePipe } from './digital-date/digital-date';
import { LongDatePipe } from './long-date/long-date';
@NgModule({
	declarations: [DigitalDatePipe,
    DigitalDatePipe,
    LongDatePipe],
	imports: [],
	exports: [DigitalDatePipe,
    DigitalDatePipe,
    LongDatePipe]
})
export class PipesModule {}

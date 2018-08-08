import { NgModule } from '@angular/core';
import { DigitalDatePipe } from './digital-date/digital-date';
@NgModule({
	declarations: [DigitalDatePipe,
    DigitalDatePipe],
	imports: [],
	exports: [DigitalDatePipe,
    DigitalDatePipe]
})
export class PipesModule {}

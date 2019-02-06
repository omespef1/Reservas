import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [ExpandableComponent,
    AccordionComponent],
	imports: [],
	exports: [ExpandableComponent,
    AccordionComponent]
})
export class ComponentsModule {}

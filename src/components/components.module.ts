import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { AccordionComponent } from './accordion/accordion';
import { SkeletonItemComponent } from './skeleton-item/skeleton-item';
@NgModule({
	declarations: [ExpandableComponent,
    AccordionComponent,
    SkeletonItemComponent],
	imports: [],
	exports: [ExpandableComponent,
    AccordionComponent,
    SkeletonItemComponent]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { MaskDirective } from './mask.directive';

@NgModule({
    imports: [],
    declarations: [
        MaskDirective
    ],
    exports: [
        MaskDirective
    ]
})

 export class DirectiveModule {
    static forRoot() {
       return {
           ngModule: DirectiveModule,
           providers: [],
       };
    }
  } 
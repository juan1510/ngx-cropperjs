import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCropperjsComponent } from './ngx-cropperjs.component';

export * from './ngx-cropperjs.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgxCropperjsComponent
    ],
    exports: [
        NgxCropperjsComponent
    ]
})
export class NgxCropperjsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxCropperjsModule,
            providers: []
        };
    }
}
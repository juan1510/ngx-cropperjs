# angular-cropperjs

[CropperJS](https://fengyuanchen.github.io/cropperjs/) integration for Angular 5+
 
## How to use

1- Install the library:

```bash
$ npm install ngx-cropperjs --save
```

2- Import and load `NgxCropperjsModule` in the module you want to use, for example `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//
// Import angular-cropperjs
import { NgxCropperjsModule } from 'ngx-cropperjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    
    //
    // Load angular-cropperjs
    NgxCropperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3- Use the component in your template like this:

```html
<!-- You can now use angular-cropper component in app.component.html -->
<ngx-cropperjs [cropperOptions]="config" [imageUrl]="imageUrl"></ngx-cropperjs>
```

**Using CropperJS methods:**

Use @ViewChild in your component to get the element:

*In your app.component.html*
```html
<ngx-cropperjs #angularCropper ..>
```

*And in your app.component.ts*
```js

//
// Import AngularCropperjsComponent
import { NgxCropperjsComponent } from 'ngx-cropperjs';

//
// Get with @ViewChild
@ViewChild('angularCropper') public angularCropper: NgxCropperjsComponent;
```

Then just call the CropperJS method you want:

*anywhere in your app.component.ts*
```js

//
// Lets try to zoom
this.angularCropper.cropper.zoom(0.1);
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License
MIT © [Stefano Gargiulo](mailto:info@creativeprogramming.com)

Based on a fork of:

MIT © [Matheus Davidson](mailto:matheusdavidson@gmail.com)

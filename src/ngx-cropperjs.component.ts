import { Component, Input, ViewChild, Output, EventEmitter, ElementRef, ViewEncapsulation } from '@angular/core';
import * as Cropper from 'cropperjs/dist/cropper';


/*--------  Interface: Image cropper setting  --------*/


export interface ImageCropperSetting {
    width: number;
    height: number;
}


/*--------  Interface: Image Cropper Rresult  --------*/


export interface ImageCropperResult {
    imageData: Cropper.ImageData;
    cropData: Cropper.CropBoxData;
    blob?: Blob;
    dataUrl?: string;
}


/*--------  Component  --------*/


@Component({
    selector: 'ngx-cropperjs',
    templateUrl: './ngx-cropperjs.component.html',
    styleUrls: ['./ngx-cropperjs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgxCropperjsComponent {


    /*--------  View child elements  --------*/


    @ViewChild('image') image: ElementRef;


    /*--------  Input properties  --------*/


    @Input() imageUrl: any;
    @Input() settings: ImageCropperSetting;
    @Input() cropbox: Cropper.CropBoxData;
    @Input() loadImageErrorText: string;
    @Input() cropperOptions: any;


    /*--------  Output events  --------*/


    @Output() export = new EventEmitter<ImageCropperResult>();
    @Output() ready = new EventEmitter();


    /*--------  Properties  --------*/


    public isLoading: boolean = true;
    public cropper: Cropper;
    public imageElement: HTMLImageElement;
    public loadError: any;

    /*--------  Controller  --------*/

    /**
     * Image lodaded event
     * @param {event} ev 
     */
    imageLoaded(ev: Event) {

        //
        // Unset load error state
        this.loadError = false;

        //
        // Setup image element
        const image = ev.target as HTMLImageElement;
        this.imageElement = image;

        // 
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin) image.crossOrigin = 'anonymous';

        //
        // Image on ready event
        image.addEventListener('ready', () => {
            //
            // Emit ready
            this.ready.emit(true);

            //
            // Unset loading state
            this.isLoading = false;

            //
            // Validate cropbox existance
            if (this.cropbox) {

                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });

        //
        // Setup aspect ratio according to settings
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }

        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);

        //
        // Set cropperjs
        this.cropper = new Cropper(image, this.cropperOptions);
    }

    /**
     * Image load error
     * @param {event} event 
     */
    imageLoadError(event: any) {

        //
        // Set load error state
        this.loadError = true;

        //
        // Unset loading state
        this.isLoading = false;
    }

    /**
     * Export canvas
     * @param {string} base64 
     */
    exportCanvas(base64?: any) {

        //
        // Get and set image, crop and canvas data
        const imageData = this.cropper.getImageData();
        const cropData = this.cropper.getCropBoxData();
        const canvas = this.cropper.getCroppedCanvas();
        const data = { imageData, cropData };

        //
        // Create promise to resolve canvas data
        const promise = new Promise(resolve => {

            //
            // Validate base64
            if (base64) {

                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(blob => resolve({ blob }));
        });

        //
        // Emit export data when promise is ready
        promise.then(res => {
            this.export.emit(Object.assign(data, res));
        });
    }
}

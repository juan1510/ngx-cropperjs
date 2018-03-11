import { EventEmitter, ElementRef } from '@angular/core';
import * as Cropper from 'cropperjs/dist/cropper';
export interface ImageCropperSetting {
    width: number;
    height: number;
}
export interface ImageCropperResult {
    imageData: Cropper.ImageData;
    cropData: Cropper.CropBoxData;
    blob?: Blob;
    dataUrl?: string;
}
export declare class NgxCropperjsComponent {
    image: ElementRef;
    imageUrl: any;
    settings: ImageCropperSetting;
    cropbox: Cropper.CropBoxData;
    loadImageErrorText: string;
    cropperOptions: any;
    export: EventEmitter<ImageCropperResult>;
    ready: EventEmitter<{}>;
    isLoading: boolean;
    cropper: Cropper;
    imageElement: HTMLImageElement;
    loadError: any;
    lastImgSrc: string;
    /**
     * Image lodaded event
     * @param ev
     */
    imageLoaded(ev: Event): void;
    /**
     * Image load error
     * @param event
     */
    imageLoadError(event: any): void;
    /**
     * Export canvas
     * @param base64
     */
    exportCanvas(base64?: any): void;
}

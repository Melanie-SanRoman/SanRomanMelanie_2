class FilterComplejo{
    constructor(imgWidth, imgHeight, cxt, imageData) {
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.cxt = cxt;
        this.imageData = imageData;
        this.originData = new Uint8ClampedArray(this.imageData.data); // copia
    }

    definirKernel(type) { } //abstracto
    
    apply() { }
    
    setPixel() { }
}
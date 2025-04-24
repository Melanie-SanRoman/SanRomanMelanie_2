class Filter{
    constructor(imgWidth, imgHeight, cxt, imageData) {
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.cxt = cxt;
        this.imageData = imageData;
    }

    apply() {
        for (let x = 0; x < this.imgWidth; x++) {
            for (let y = 0; y < this.imgHeight; y++) {
    
                const index = (x + y * this.imageData.width) * 4;
                const r = this.imageData.data[index];
                const g = this.imageData.data[index + 1];
                const b = this.imageData.data[index + 2];
    
                this.setPixel(this.imageData, r, g, b, index);
            }
        }
        this.cxt.putImageData(this.imageData, 0, 0);
    }


    setPixel(imageData, r, g, b, a, index){ } // abstracto
}
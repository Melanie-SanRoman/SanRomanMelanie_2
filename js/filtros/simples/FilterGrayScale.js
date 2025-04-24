class FilterGrayScale extends Filter{
    constructor(imgWidth, imgHeight, cxt, imageData) {
        super(imgWidth, imgHeight, cxt, imageData);
    }

    setPixel(imageData, r, g, b, index) {
        // Gris = (R + G + B) / 3
        let average = (r + g + b) / 3;
    
        imageData.data[index + 0] = average;
        imageData.data[index + 1] = average;
        imageData.data[index + 2] = average;
    }
    
}
class FilterNegative extends Filter{
    constructor(imgWidth, imgHeight, cxt, imageData) {
        super(imgWidth, imgHeight, cxt, imageData);
    }

    setPixel(imageData, r, g, b, index) {
        // Altera valores RGB, invierte cada valor
        let newR = 255 - r;
        let newG = 255 - g;
        let newB = 255 - b;

        imageData.data[index + 0] = newR;
        imageData.data[index + 1] = newG;
        imageData.data[index + 2] = newB;
    }
}
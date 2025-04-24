class FilterSepia extends Filter{
    constructor(imgWidth, imgHeight, cxt, imageData) {
        super(imgWidth, imgHeight, cxt, imageData);
    }

    setPixel(imageData, r, g, b, index) {
        // Altera valores RGB, aumenta Rojo, reduce levemente Verde, y reduce significativamente Azul
        let newR = Math.min(255, r + 30);
        let newG = Math.min(255, g - 10);
        let newB = Math.min(255, b - 50);

        imageData.data[index + 0] = newR;
        imageData.data[index + 1] = newG;
        imageData.data[index + 2] = newB;
    }
}
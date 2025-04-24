class FilterBrightness extends Filter {
    constructor(imgWidth, imgHeight, cxt, imageData) {
        super(imgWidth, imgHeight, cxt, imageData);
    }

    setPixel(imageData, red, green, blue, index) {
        // PASO DE RGB A HSB

        let brightness = Math.max(red / 255, green / 255, blue / 255);
        let saturation;

        if (brightness == 0) saturation = 0;
        else saturation = (brightness - Math.min(red / 255, green / 255, blue / 255)) / brightness;

        let hue;

        if (brightness == 0) {
            hue = 0;
        }
        else {
            let max = Math.max(red, green, blue);

            if (max == red) hue = (green - blue) / (brightness);
            if (max == green) hue = (blue - red) / (brightness) + 2;
            if (max == blue) hue = (red - green) / (brightness) + 4;
        }

        hue = (hue % 6) * 60
        saturation *= 100;
        brightness *= 100;

        brightness = Math.min(brightness * 1.2, 100);

        // PASO DE HSB A RGB

        saturation = saturation / 100;
        brightness = brightness / 100;

        const C = brightness * saturation; // Donde C es el componente de color
        const X = C * (1 - Math.abs(hue / 60 % 2 - 1)); // Donde X es un valor intermedio
        const m = brightness * (1 - saturation); // Donde m es el componente de color base

        let r1 = 0, g1 = 0, b1 = 0;

        if (hue < 60) { r1 = C; g1 = X; b1 = 0; }
        else if (hue < 120) { r1 = X; g1 = C; b1 = 0; }
        else if (hue < 180) { r1 = 0; g1 = C; b1 = X; }
        else if (hue < 240) { r1 = 0; g1 = X; b1 = C; }
        else if (hue < 300) { r1 = X; g1 = 0; b1 = C; }
        else { r1 = C; g1 = 0; b1 = X; }

        red = (r1 + m) * 255;
        green = (g1 + m) * 255;
        blue = (b1 + m) * 255;

        imageData.data[index + 0] = red;
        imageData.data[index + 1] = green;
        imageData.data[index + 2] = blue;
        imageData.data[index + 3] = this.imageData.data[index + 3]; // mantiene alpha
    }
}
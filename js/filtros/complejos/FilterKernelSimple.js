class FilterKernelSimple extends FilterComplejo{
    constructor(imgWidth, imgHeight, cxt, imageData, type) {
        super(imgWidth, imgHeight, cxt, imageData);
        this.definirKernel(type);
    }

    definirKernel(type) {
        switch (type) {
            case 'blur':
                this.defineKernelBlur();
                break;
            case 'sharpen':
                this.defineKernelSharpen();
                break;
            case 'edge_detection':
                this.defineKernelEdgeDetection();
                break;
        }
    }

    defineKernelBlur() {
        this.kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    }

    defineKernelSharpen() {
        this.kernel = [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ]
    }

    defineKernelEdgeDetection() {
        this.kernel = [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ]
    }

    apply() {
        for (let y = 1; y < this.imgHeight - 1; y++) { // recorre la imagen en alto
            for (let x = 1; x < this.imgWidth - 1; x++) { // recorre la imagen en ancho

                let r = 0, g = 0, b = 0;
                let kernelSum = 0;

                for (let ky = -1; ky <= 1; ky++) { // recorre kernel en y
                    for (let kx = -1; kx <= 1; kx++) { //recorre kernel en x

                        let pixelX = x + kx;
                        let pixelY = y + ky;
                        let idx = (pixelY * this.imgWidth + pixelX) * 4;

                        let weight = this.kernel[ky + 1][kx + 1];
                        kernelSum += weight;

                        r += this.originData[idx] * weight;
                        g += this.originData[idx + 1] * weight;
                        b += this.originData[idx + 2] * weight;
                    }
                }
                let index = (y * this.imgWidth + x) * 4;
                this.setPixel(r, g, b, kernelSum, index);
            }
        }
        this.cxt.putImageData(this.imageData, 0, 0);
    }

    setPixel(r, g, b, kernelSum, index) {
        r = r / kernelSum;
        g = g / kernelSum;
        b = b / kernelSum;

        this.imageData.data[index] = r;
        this.imageData.data[index + 1] = g;
        this.imageData.data[index + 2] = b;
        this.imageData.data[index + 3] = this.originData[index + 3];
    }
}
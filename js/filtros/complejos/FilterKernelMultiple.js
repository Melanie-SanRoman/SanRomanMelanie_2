class FilterKernelMultiple extends FilterComplejo{
    constructor(imgWidth, imgHeight, cxt, imageData, type) {
        super(imgWidth, imgHeight, cxt, imageData);
        this.definirKernel(type);
    }

    definirKernel(type) {
        switch (type) {
            case 'sobel':
                this.defineKernelSobel();
                break;
        }
    }

    defineKernelSobel() {
        this.kernelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        this.kernelY = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];
    }

    apply() {
        if (!this.kernelX || !this.kernelY)  return;
    
        for (let y = 1; y < this.imgHeight - 1; y++) {
            for (let x = 1; x < this.imgWidth - 1; x++) {

                let gxR = 0, gxG = 0, gxB = 0;
                let gyR = 0, gyG = 0, gyB = 0;

                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        let pixelX = x + kx;
                        let pixelY = y + ky;
                        let idx = (pixelY * this.imgWidth + pixelX) * 4;

                        let weightX = this.kernelX[ky + 1][kx + 1];
                        let weightY = this.kernelY[ky + 1][kx + 1];

                        gxR += this.originData[idx] * weightX;
                        gxG += this.originData[idx + 1] * weightX;
                        gxB += this.originData[idx + 2] * weightX;

                        gyR += this.originData[idx] * weightY;
                        gyG += this.originData[idx + 1] * weightY;
                        gyB += this.originData[idx + 2] * weightY;
                    }
                }

                let r = Math.sqrt(gxR * gxR + gyR * gyR);
                let g = Math.sqrt(gxG * gxG + gyG * gyG);
                let b = Math.sqrt(gxB * gxB + gyB * gyB);

                let index = (y * this.imgWidth + x) * 4;
                this.imageData.data[index] = r;
                this.imageData.data[index + 1] = g;
                this.imageData.data[index + 2] = b;
                this.imageData.data[index + 3] = this.originData[index + 3]; // mantiene alpha
            }
        }
        this.cxt.putImageData(this.imageData, 0, 0);
    }
}

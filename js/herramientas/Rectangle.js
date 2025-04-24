class Rectangle extends Herramienta{
    constructor(posX, posY, context, fill, width, height) {
        super(posX, posY, context)
        this.fill = fill;
        this.width = width;
        this.height = height;
    }

    /**
     * Dibujo un rectangulo sobre el canvas siguiendo el mouse
     */
    execute(startX, startY) {
        this.context.fillStyle = this.fill;

        this.context.beginPath();
        this.context.rect(startX, startY, this.width, this.height);
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
    }

    setWeH(w, h) {
        this.width = w;
        this.height = h;
    }
}


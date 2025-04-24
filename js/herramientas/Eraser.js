class Eraser extends Herramienta{
    constructor(posX, posY, context) {
        super(posX, posY, context);
    }

    /**
     * Borra en el canvas utilizando el mouse
     */
    execute(offsetX, offsetY) {
        this.context.beginPath();
        this.context.arc(offsetX, offsetY, this.lineWidth, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
    }
}
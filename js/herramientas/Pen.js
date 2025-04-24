
class Pen extends Herramienta{
    constructor(posX, posY, context, fill) {
        super(posX,posY,context);
        this.fill = fill;
    }

    /**
     * Dibuja como un lapiz sobre el canvas siguiendo el mouse
     */
    execute(offsetX, offsetY) {
        this.context.fillStyle = this.fill;

        this.context.beginPath();
        this.context.arc(offsetX, offsetY, this.lineWidth, 0, 2 * Math.PI);
        this.context.fill(); 
        this.context.stroke();

    }

    setXeY(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}
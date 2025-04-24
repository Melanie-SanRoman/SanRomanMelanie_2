class Eraser extends Herramienta{
    constructor(posX, posY, context) {
        super(posX, posY, context);
        this.context.lineCap = "round"; // suaviza la línea
    }

    /**
     * Borra como una goma sobre el canvas siguiendo el mouse
     */
    execute(offsetX, offsetY) {

        this.context.beginPath();
        this.context.moveTo(this.posX, this.posY); // último punto
        this.context.lineTo(offsetX, offsetY); // nuevo punto
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();

        this.setXeY(offsetX, offsetY); // actualiza la posición actual
    }

    setXeY(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}

class Pen extends Eraser {
    constructor(posX, posY, context, fill) {
        super(posX, posY, context);
        this.context.fillStyle = fill;
    }

    /**
     * Dibuja como un lapiz sobre el canvas siguiendo el mouse
     * Utiliza el metodo de la clase padre 
     */
    // execute(offsetX, offsetY)    
}
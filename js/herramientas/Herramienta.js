class Herramienta{
    constructor(posX, posY, context) {
        this.posX = posX;
        this.posY = posY;
        this.context = context;
        this.lineWidth = 2;
    }

    execute(x, y) { }
    
    /**
     * Metodo para cambiar el grosor de las herramientas a traves de los sliders
     */
    setLineWidth(x) {
        this.lineWidth = x;
    }

    /**
     * Metodo para cambiar el color de la herramienta a traves del picker y los botones de colores
     * @param {} x 
     */
    setColor(x) {
        this.fill = x;
        this.context.strokeStyle = x;
    }
}
// CONSTANTES

const CANVAS = document.getElementById('canvas');
const CXT = CANVAS.getContext('2d');

const MODAL = document.querySelector('.modal');
const INFO_MODAL = document.querySelector('.info-modal');

const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

const herramientas = document.querySelectorAll('.herramienta');

// VARIABLES

let inputImg = document.getElementById('img');
let files = [];
let imageData;
let imgState = [];

// HERRAMIENTAS
let pen = new Pen(0, 0, CXT, "black");
let rect = new Rectangle(0, 0, CXT, "black");
let eraser = new Eraser(0, 0, CXT);


// ESTADO DE LAS HERRAMIENTAS (ACTIVE)

herramientas.forEach(btn => {
    btn.addEventListener('click', () => {
      // Si ya está activo, lo desactivo
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
      } else {
        // Desactivo todos y activo el actual
        herramientas.forEach(tool => tool.classList.remove('active'));
        btn.classList.add('active');
      }
    });
});

// VARIABLES DE ESTADO

let img = new Image();
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let startX = 0;
let startY = 0;
let penActive = false;
let eraserActive = false;
let rectActive = false;

// MANEJO DE EVENTOS

// DIBUJAR
CANVAS.addEventListener('mousedown', startDrawing);
CANVAS.addEventListener('mousemove', draw);
CANVAS.addEventListener('mouseup', stopDrawing);

// OPCIONES DE HEADER
document.getElementById('btn-descartar').addEventListener('click', descartar);
document.getElementById('btn-modal-dowloand').addEventListener('click', openModal);
document.getElementById('btn-dowloand').addEventListener('click', dowloand);
document.getElementById('btn-cancel').addEventListener('click', closeModal);
document.getElementById('img').addEventListener('change', display); // dibujar imagen

// HERRAMIENTAS ASIDE Y FOOTER
document.getElementById('act-pen').addEventListener('click', activePen);
document.getElementById('act-eraser').addEventListener('click', activeEraser);
document.getElementById('act-rect').addEventListener('click', activeRect);
document.getElementById('undo').addEventListener("click", undo);
document.getElementById('color-picker').addEventListener("change", changeColor);


// MANEJO DE EVENTOS A ELEMENTOS CON CLASE

// INPUTS SLIDERS
let sliders = document.getElementsByClassName('slider');
for (let slider of sliders) {
    slider.addEventListener("click", changeLineWidht);
}

// BOTONES DE COLORES PREDEFINIDOS
let colors = document.getElementsByClassName('color-def');
for (let btn of colors) {
    btn.addEventListener("click", changeColor);
}

// BOTONES DE FILTROS
let filters = document.getElementsByClassName('btn-filter');
for (let btn of filters) {
    btn.addEventListener("click", applyFilter);
}

// DEFINICION DE FUNCION ONLOAD

/**
 * Funcion que se llama al recargar la pagina
 */
function main() {

}

// DEFINICION DE FUNCIONES QUE CONTROLAN EL MODAL

/**
 * Funcion que oculta el modal con su transicion
 */
function closeModal() {
    INFO_MODAL.classList.remove("fade-in");
    INFO_MODAL.classList.add("fade-out");

    setTimeout(() => {
        MODAL.style.display = "none";
        INFO_MODAL.classList.remove("fade-out"); // limpia por si se se vuelve a abrir
    }, 400);
}

/**
 * Funcion que muestra el modal con su transicion
 */
function openModal() {
    MODAL.style.display = 'flex';
    MODAL.style.display = "block";
    INFO_MODAL.classList.add("fade-in");
}

// DEFINICION DE FUNCIONES QUE CONTROLAN EL PAINT

// FUNCIONES QUE CONTROLAN EL COMPORTAMIENTO DE LAS OPCIONES DEL HEADER

/**
 * Funcion que dibuja la imagen seleccionada en el canvas
 */
function display() {
    files = inputImg.files;
    if (files.length > 0) {

        img.src = window.URL.createObjectURL(files[0]);

        img.onload = function () {

            CXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Limpia canvas antes de dibujar

            // Calcula la escala para mantener la proporción
            let scale = Math.min(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
            let newWidth = img.width * scale;
            let newHeight = img.height * scale;

            // Centra la imagen en el canvas
            let dx = (CANVAS_WIDTH - newWidth) / 2;
            let dy = (CANVAS_HEIGHT - newHeight) / 2;

            CXT.drawImage(img, dx, dy, newWidth, newHeight);
        }
    }
}

// FUNCIONES QUE CONTROLAN EL COMPORTAMIENTO DENTRO DEL CANVAS EN EL MAIN

/**
 * Funcion para descartar el contenido del canvas
 */
function descartar() {
    imgState.push(CXT.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    CXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (files != []) {
        inputImg.value = "";
    }
}

/**
 * Funcion para descargar el contenido del canvas como imagen png
 */
function dowloand() {
    let dataURL = CANVAS.toDataURL('image/png');

    let link = document.createElement('a');
    link.href = dataURL;
    link.download = 'mi_imagen.png';
    link.click();

    closeModal();
}

/**
 * Funcion que detecta un click con el mouse dentro del canvas 
 */
function startDrawing(e) {
    imgState.push(CXT.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));

    isDrawing = true;
    imageData = CXT.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const { offsetX, offsetY } = e;

    [startX, startY] = [offsetX, offsetY];
    [lastX, lastY] = [offsetX, offsetY];

    mouseDown = true;
    mouseUp = false;
}

/**
 * Funcion que detecta el moviemiento del mouse dentro del canvas 
 */
function draw(e) {
    if (!isDrawing) { return }

    const { offsetX, offsetY } = e;

    if (mouseDown && penActive) {
        CXT.globalCompositeOperation = "source-over";
        pen.execute(offsetX, offsetY);

        [lastX, lastY] = [offsetX, offsetY];
    }
    if (mouseDown && eraserActive) {
        CXT.globalCompositeOperation = "destination-out";
        eraser.execute(offsetX, offsetY);

        [lastX, lastY] = [offsetX, offsetY];
    }
    if (mouseDown && rectActive) {
        CXT.globalCompositeOperation = "source-over";
        CXT.putImageData(imageData, 0, 0);

        let width = offsetX - startX;
        let height = offsetY - startY;

        rect.setWeH(width, height);
        rect.execute(startX, startY);
    }
}

/**
 * Funcion que detecta que se dejo de hacer un click con el mouse dentro del canvas 
 */
function stopDrawing(e) {
    isDrawing = false;
    mouseDown = false;
    mouseUp = true;
}

// FUNCIONES CONTROLAN LAS HERRAMIENTAS DEL NAV EN EL ASIDE

function activePen() {
    penActive = true;
    eraserActive = false;
    rectActive = false;
}

function activeEraser() {
    eraserActive = true;
    penActive = false;
    rectActive = false;
}

function activeRect() {
    rectActive = true;
    penActive = false;
    eraserActive = false;
}

function undo() {
    if (imgState.length == 0) return;
    CXT.putImageData(imgState[imgState.length - 1], 0, 0);
    imgState.pop();
}

// FUNCIONES QUE DEFINEN EL GROSOR DE LINEA Y COLOR DE LAS HERRAMIENTAS
function changeColor(e) {
    const { value } = e.target;
    pen.setColor(value);
    document.getElementById('color-picker').value = value;
    if (rectActive) activeRect();
    else activePen();
}

function changeLineWidht(e) {
    const { value } = e.target;
    console.log(e.target.id);
    if (e.target.id == 'slider-pen') {
        pen.setLineWidth(value);
        activePen();
    }
    else if(e.target.id == 'slider-eraser'){
        eraser.setLineWidth(value);
        activeEraser();
    }
    else{
        rect.setLineWidth(value);
        activeRect();
    }
}

// DEFINICION DE FUNCIONES QUE CONTROLAN EL COMPORTAMIENTO DE LAS IMAGENES

/**
 * Funcion que aplica el filtro en la imagen depende el boton apretado
 * @param {} e 
 */
function applyFilter(e) {
    imgState.push(CXT.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));

    let imgWidth = img.width;
    let imgHeight = img.height;

    let imageData = CXT.getImageData(0, 0, imgWidth, imgHeight);

    let filter = e.target.id;

    switch (filter) {
        case 'grayScale':
            let filterGrayScale = new FilterGrayScale(imgWidth, imgHeight, CXT, imageData);
            filterGrayScale.apply();
            break;
        case 'sepia':
            let filterSepia = new FilterSepia(imgWidth, imgHeight, CXT, imageData);
            filterSepia.apply();
            break;
        case 'negative':
            let filterNegative = new FilterNegative(imgWidth, imgHeight, CXT, imageData);
            filterNegative.apply();
            break;
        case 'binarization':
            let filterBinarization = new FilterBinarization(imgWidth, imgHeight, CXT, imageData);
            filterBinarization.apply();
            break;
        case 'brightness':
            let filterBrightness = new FilterBrightness(imgWidth, imgHeight, CXT, imageData);
            filterBrightness.apply();
            break;
        case 'blur':
        case 'sharpen':
        case 'edge_detection':
            let filterKernelSimple = new FilterKernelSimple(imgWidth, imgHeight, CXT, imageData, filter);
            filterKernelSimple.apply();
            break;
        case 'sobel':
            let filterKernelMultiple = new FilterKernelMultiple(imgWidth, imgHeight, CXT, imageData, filter);
            filterKernelMultiple.apply();
            break;
    }
}
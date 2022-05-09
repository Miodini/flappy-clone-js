import birdImg from '../../assets/img/bird2.png'

export default class Bird{
    /**
     * Define o passarinho (personagem controlável)
     * @param {Number} upSpeed - Upwards pixel displacement per frame
    */
    constructor(upSpeed) {
        this.upSpeed = upSpeed
        this.loaded = false // Stays false until the image file is fully loaded
        this.img = new Image()
        this.img.src = birdImg
        this.img.onload = () => this.loaded = true
        // this.voando = true
        // window.onkeydown = () => this.voando = true
        // window.onkeyup = () => this.voando = false
    }
    config(canvasCenterX, canvasCenterY){
        const imgScaling = 5; // May be changed for different sizes of the bird
        const width = this.img.width * imgScaling
        const height = this.img.height * imgScaling
        /* --- Another set of attributes --- */
        this.pos = {
            x: canvasCenterX  - (width /2),
            y: canvasCenterY - (height /2)
        }
        this.size = {
            width,
            height
        }
        /* --------------------------------- */
    }
    // /**
    //  * Centraliza o passarinho na tela
    // */
    // recenter(){
    //     const alturaJogo = this.gameDiv.getBoundingClientRect().height
    //     this.element.style.top = `${alturaJogo / 2}px`
    // }
    // /**
    //  * Move o passarinho para cima ou para baixo
    //  * @returns {Number} Posição em pixels da distância do passarinho do topo (pós atualização)
    // */
    // animate(){
    //     const alturaJogo = this.gameDiv.getBoundingClientRect().height
    //     const yAtual = getPixel(this.element, 'top')
    //     let newY = yAtual + (this.voando ? -this.upSpeed : this.downSpeed)
    //     if (newY < 0)
    //         newY = 0
    //     else if (newY > alturaJogo - 54)
    //         newY = alturaJogo - 54 //50 = Altura da imagem, 4 = borda
    //     this.element.style.top = `${newY}px`
    //     return newY
    // } 
    // /**
    //  * Retorna a distância em pixels do topo
    //  * @returns {Number}
    // */
    // getY(){
    //     return getPixel(this.element, 'top')
    // }
}
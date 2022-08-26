import birdImg from '../../assets/img/bird2.png'

export default class Bird{
    /**
     * Define o passarinho (personagem controlável)
     * @param {Number} yThrust - Ammount of vertical velocity earned with each flap
    */
    constructor(canvasCenterX, canvasCenterY, yThrust){
        this.yThrust = -yThrust // Y axis is reversed on canvas
        this.yVelocity = 0
        this.loaded = false // Stays false until the image file is fully loaded
        this.img = new Image()
        this.img.src = birdImg
        this.img.onload = () => {
            const imgScaling = 5; // May be changed for different rendering sizes of the bird
            const width = this.img.width * imgScaling
            const height = this.img.height * imgScaling
            /* --- Another set of attributes --- */
            this.pos = {
                x: canvasCenterX/2  - (width/2),
                y: canvasCenterY - (height/2)
            }
            this.width = width
            this.height = height
            this.loaded = true
        }
    }

    flap(){
        const maxVelocity = 3*this.yThrust
        this.yVelocity += this.yThrust
        if(this.yVelocity < maxVelocity) // Remember those values are negative
            this.yVelocity = maxVelocity
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
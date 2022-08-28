import pipeUpImg from '../../assets/img/pipe_up.png'
import pipeDownImg from '../../assets/img/pipe_down.png'

export default class Pipes {
    constructor(initialX, gapSize, xSpeed, width, height/*scoreObj, passaroObj*/) {
        this.isloaded = false   // Remains false until the image files get loaded
        this.gapSize = gapSize
        this.xSpeed = xSpeed
        this.width = width
        this.height = height
        //this.scoreObj = scoreObj
        //this.passaroObj = passaroObj
        this.x = initialX   // x coordinate
        this.pipes = {
            top: {
                img: new Image(),
                y: 0
            },
            bottom: {
                img: new Image(),
                y: 0
            }
        }
        this.pipes.top.img.src = pipeDownImg
        this.pipes.bottom.img.src = pipeUpImg
        // Waits for all assets to be loaded
        let imgTopIsLoaded = false, imgBottomIsLoaded = false
        this.pipes.top.img.onload = () => imgTopIsLoaded = true
        this.pipes.bottom.img.onload = () => imgBottomIsLoaded = true
        const timer = setInterval(() => {
            if(imgTopIsLoaded && imgBottomIsLoaded){
                clearInterval(timer)
                this.isloaded = true
            }
        }, 1)
    }
   
    /**
     * Randomly sets a new vertical position for the pipes
     * @param {Number} canvasHeight - Canvas height
    */
    setY(canvasHeight){
        const rand = Math.random()
        this.pipes.top.y = rand*(-canvasHeight + this.gapSize) - this.gapSize
        this.pipes.bottom.y = (1 - rand)*(canvasHeight - this.gapSize) + this.gapSize
    }
    /**
     * Moves the pipes'xSpeed' units left
     * 
    */
    movePipe(canvasHeight, canvasWidth){
        this.x -= this.xSpeed
        // Rollover check
        if(this.x <= 0 - this.width){
            this.x = canvasWidth    // PROVISÓRIO
            this.setY(canvasHeight)
        }

        // // Checagem para atualização do placar
        // if (xAtual > (gameWidth / 2) - 30 && newX <= (gameWidth / 2) - 30) //(gameWidth/2)-30 = posicao horizontal do passarinho
        //     this.scoreObj.incScore() 
        // Checagem de colisão
        // const alturaTop = this.canoTop.getHeight() + 30 // altura da boca = 30 pixels
        // const alturaBot = this.canoBot.getHeight() + 30
        // if(this.passaroObj.getY() < alturaTop || this.passaroObj.getY() + 50 > gameHeight - alturaBot){ // Checagem de colisão no eixo Y (50 = altura do passaro, 30 = altura da boca)
        //     if((gameWidth/2) + 30 >= newX && (gameWidth/2) - 30 <= newX + 120){ // Checagem de colisão no eixo X (120 = largura max do cano)
        //         return true
        //     }
        // }
        // return false
    }
}
class PairOfPipes {
    /**
     * Div que contém um par de canos
     * @param {Number} yPipeDist - Valor em pixel do tamanho da abertura do cano (distância entre os canos)
     * @param {Number} xSpeed - Valor em pixel que define quantidade de movimento por frame
     * @param {Score} scoreObj - Objeto do placar
     * @param {Passarinho} passaroObj - Objeto do passarinho
    */
    constructor(yPipeDist, xSpeed, scoreObj, passaroObj) {
        this.yPipeDist = yPipeDist
        this.xSpeed = xSpeed
        this.scoreObj = scoreObj
        this.passaroObj = passaroObj
        this.canoTop = new Cano(true)
        this.canoBot = new Cano(false)
        this.gameDiv = document.querySelector('.screen')

        this.element = document.createElement('div')
        this.element.className = 'parCanos'
        this.element.appendChild(this.canoTop.element)
        this.element.appendChild(this.canoBot.element)
        this.gameDiv.appendChild(this.element)
    }
    /**
     * Define a posição horizontal do par de canos
     * @param {Number} xPos - Valor em pixel da distância a partir borda esquerda 
    */
    setPipePos(xPos){
        this.element.style.left = `${xPos}px`
    }
    /**
     * Define aleatóriamente uma nova altura para os canos
     * @returns {Number} - Nova altura do cano superior
    */
    changeHeights(){
        const alturaJogo = this.gameDiv.getBoundingClientRect().height
        const newHeight = Math.random() * (alturaJogo - this.yPipeDist - 30) //30px = tamanho da boca
        this.canoTop.setHeight(newHeight) 
        this.canoBot.setHeight(alturaJogo - newHeight - this.yPipeDist)
        return newHeight
    }
    /**
     * Desloca o par de canos horizontalmente para a esquerda
     * @returns {Boolean} - true se o passaro colidiu com o cano, falso caso contrário
    */
    movePipe(){
        const xAtual = getPixel(this.element, 'left')
        const gameWidth = this.gameDiv.getBoundingClientRect().width
        const gameHeight = this.gameDiv.getBoundingClientRect().height
        let newX = xAtual - this.xSpeed
        // Checagem de rollover
        if (newX < -120) { //120 = largura máxima do cano
            newX = gameWidth + 500 // Alterar para um valor lógico dps  
            this.changeHeights()
        }
        this.setPipePos(newX)
        // Checagem para atualização do placar
        if (xAtual > (gameWidth / 2) - 30 && newX <= (gameWidth / 2) - 30) //(gameWidth/2)-30 = posicao horizontal do passarinho
            this.scoreObj.incScore() 
        // Checagem de colisão
        const alturaTop = this.canoTop.getHeight() + 30 // altura da boca = 30 pixels
        const alturaBot = this.canoBot.getHeight() + 30
        if(this.passaroObj.getY() < alturaTop || this.passaroObj.getY() + 50 > gameHeight - alturaBot){ // Checagem de colisão no eixo Y (50 = altura do passaro, 30 = altura da boca)
            if((gameWidth/2) + 30 >= newX && (gameWidth/2) - 30 <= newX + 120){ // Checagem de colisão no eixo X (120 = largura max do cano)
                return true
            }
        }
        return false
    }
}
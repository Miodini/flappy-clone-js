class Pipe {
    /**
     * Representa cada cano composto de corpo e boca.
     * @param {Boolean} [reverse=false] - Se reverse == true, o cano é exibido de "ponta cabeça"
    */
    constructor(reverse = false) {
        this.element = document.createElement('div')
        this.boca = document.createElement('div')
        this.corpo = document.createElement('div')
        
        this.element.className = 'cano'
        this.boca.className = 'boca'
        this.corpo.className = 'corpo'
        if (reverse) {
            this.element.appendChild(this.corpo)
            this.element.appendChild(this.boca)
        }
        else {
            this.element.appendChild(this.boca)
            this.element.appendChild(this.corpo)
        }
    }
    /**
     * Define a altura do cano.
     * @param {Number} altura - Em pixels
    */
    setHeight(altura){
        this.corpo.style.height = `${altura}px`
    }
    /**
     * Retorna a altura do cano em pixels
     * @returns {Number}
    */
    getHeight(){
        return getPixel(this.corpo, 'height')
    }
}
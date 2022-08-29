class Score {
    /** 
     *Contador de pontos.
    */
    constructor() {
        const gameDiv = document.querySelector('.screen')
        this.element = document.createElement('div')
        this.element.className = 'pontos'
        this.element.innerText = '0'

        gameDiv.appendChild(this.element)
    }
    /**
     * Aumenta o ponto em 1.
     * @returns {Number} Valor dos pontos atualizado.
    */
    incScore(){
        let ponto = parseInt(this.element.innerText)
        this.element.innerText = ++ponto
        return ponto
    }
    restart(){
        this.element.innerText = '0'
    }
}
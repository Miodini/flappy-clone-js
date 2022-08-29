//const Snap = require('snapsvg')

export default class Pipe {
    /**
     * Representa cada cano composto de corpo e boca.
     * @param {Boolean} [reverse=false] - Se reverse == true, o cano é exibido de "ponta cabeça"
    */
    constructor(reverse = false) {
        this.reverse = reverse
        this.polygon.classList.add('points', 'style="fill:green;"')
    }
    /**
     * Define a altura do cano.
     * @param {Number} altura - Em pixels
    */
    setHeight(height){
        
    }
    /**
     * Retorna a altura do cano em pixels
     * @returns {Number}
    */
    getHeight(){
        return getPixel(this.corpo, 'height')
    }
}
import Bird from './Bird'

export default class Canvas{
    constructor(gravity = -50){
        /* --- Atributes --- */
        this.gravity = -gravity // Y axis is reversed on canvas
        this.element = document.createElement('canvas')
        this.ctx = this.element.getContext('2d')
        this.bird = new Bird(100)
        /* ----------------- */
        
        const rootDiv = document.querySelector('#screen')
        const h1Height = document.querySelector('h1').getBoundingClientRect().height
        // idk why but you need to subtract 56 for the canvas to fit exactly in the page
        const canvasHeight = window.innerHeight - h1Height - 56 
        this.element.height = canvasHeight
        this.element.width = canvasHeight*4/3 // 4:3 proportion
        this.ctx.imageSmoothingEnabled = false
        rootDiv.appendChild(this.element)
        addEventListener('keydown', () => this.bird.flap()) 
        this.__debugIndex__ = 0
    }
    /**
     * Calls the callback function when all of the canvas assets are loaded, i.e. is ready to run
     * @param {Function} callback - The function to be called
     */
    onLoad(callback){
        const timer = setInterval(() => {
            if(this.bird.loaded === true){
                clearInterval(timer)
                this.bird.config((this.element.width/2), (this.element.height/2))
                callback()
            }
        }, 1)
    }
    // TODO: gravity may need some rework
    draw(debug = false){
        const time = .06
        // Background
        this.ctx.fillStyle = 'skyblue'
        this.ctx.fillRect(0, 0, this.element.width, this.element.height)
        // Bird position update
        this.bird.yVelocity += this.gravity * time
        this.bird.pos.y += (this.bird.yVelocity * time) + (this.gravity * time^2 / 2)
        // Screen collision detection
        if(this.bird.pos.y > this.element.height - this.bird.height){
            this.bird.pos.y = this.element.height - this.bird.height
            this.bird.yVelocity = 0
        }
        else if(this.bird.pos.y < 0){
            this.bird.pos.y = 0
            this.bird.yVelocity = 0
        }
        this.ctx.drawImage(
            this.bird.img, 
            this.bird.pos.x,
            this.bird.pos.y,
            this.bird.width,
            this.bird.height
        )
        if(debug) this._debug(30)
    }
    // Logs some debug info every n frame
    _debug(n){
        this.__debugIndex__++
        if(this.__debugIndex__ % n === 0)
            console.log(this.bird.yVelocity)
        if(this.__debugIndex__ >= 60)
            this.__debugIndex__ = 0
    }
}
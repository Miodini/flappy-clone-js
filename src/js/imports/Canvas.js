import Bird from './Bird'

export default class Canvas{
    constructor(){
        /* --- Atributes --- */
        this.element = document.createElement('canvas')
        this.ctx = this.element.getContext('2d')
        this.bird = new Bird(5)
        /* ----------------- */
        
        const rootDiv = document.querySelector('#screen')
        const h1Height = document.querySelector('h1').getBoundingClientRect().height
        // idk why but you need to subtract 56 for the canvas to fit exactly in the page
        const canvasHeight = window.innerHeight - h1Height - 56 
        this.element.height = canvasHeight
        this.element.width = canvasHeight*4/3 // 4:3 proportion
        this.ctx.imageSmoothingEnabled = false
        rootDiv.appendChild(this.element)
        addEventListener('keydown', () => this.flap()) 
   
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
    flap(){
        this.bird.pos.y -= this.bird.upSpeed
    }
    draw(){
        // Background
        this.ctx.fillStyle = 'skyblue'
        this.ctx.fillRect(0, 0, this.element.width, this.element.height)
        // Bird
        this.ctx.drawImage(
            this.bird.img, 
            this.bird.pos.x,
            this.bird.pos.y,
            this.bird.size.width,
            this.bird.size.height
        )
    }
}
import Bird from './Bird'
import Pipes from './Pipes'

const pWidth = 100, pipesDist = 300, gapSize = 150

export default class Canvas{
    constructor(height, gravity = -50){
        this.gravity = -gravity // Y axis is reversed on canvas
        this.element = document.createElement('canvas')
        this.element.id = 'game'
        this.ctx = this.element.getContext('2d')
        this.ctx.imageSmoothingEnabled = false
        
        this.element.height = height
        this.element.width = height*9/16 // 16:9 proportion
        this.bird = new Bird(100)
        /* TODO : 
            The amount of pipes created should depend on their speed and distance between them 
        */
        this.pipesPairs = [
            new Pipes(this.element.width, gapSize, 1.5, pWidth, height),
            new Pipes(this.element.width + pipesDist, gapSize, 1.5, pWidth, height),
        ]
        this.pipesPairs.forEach((pair) => pair.setY(this.element.height))
        
        document.getElementById('screen').appendChild(this.element)
    }
    
    /**
     * Waits for all assets to be loaded
     * @returns {Promise} - Resolves on load finish. Rejects on error.
     */
    async load(){
        try{
            await this.bird.loadImg(this.element.width/2, this.element.height/2)
            this.pipesPairs.forEach(async (pair) => {
                await pair.loadImg()
            })
            // After loading, draws background and awaits for input
            // Background
            this.ctx.fillStyle = 'skyblue'
            this.ctx.fillRect(0, 0, this.element.width, this.element.height)
            // Text
            this.ctx.font = '18px PublicPixel'
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.fillText('Press any key to start.', this.element.width/2, this.element.height/2)

            window.onkeydown = () => {
                window.onkeydown = () => this.bird.flap()
                this.animate()
            }
        }
        catch(e){ 
            console.error(e)
        }
    }

    /**
     * Checks if the bird collided with one of the pipes
     * @returns {Boolean} - true if the bird collided, false otherwise
     */
    collisionCheck(){
        for(let pair of this.pipesPairs){
            if((this.bird.y < pair.pipes.top.yBottom || this.bird.y + this.bird.height > pair.pipes.bottom.y) && // y axis
                (this.bird.x + this.bird.width >= pair.x && this.bird.x <= pair.x + pair.width)) // x axis
                    return true
        }
        return false
    }

    

    animate(){
        if(this.draw())     // Stop drawing when game over
            requestAnimationFrame(() => this.animate())
    }

    draw(){
        const time = .06
        // Background
        this.ctx.fillStyle = 'skyblue'
        this.ctx.fillRect(0, 0, this.element.width, this.element.height)
        // Bird position update
        this.bird.yVelocity += this.gravity * time
        this.bird.y += (this.bird.yVelocity * time) + (this.gravity * time^2 / 2)
        // Screen collision detection
        if(this.bird.y > this.element.height - this.bird.height){
            this.bird.y = this.element.height - this.bird.height
            this.bird.yVelocity = 0
        }
        else if(this.bird.y < 0){
            this.bird.y = 0
            this.bird.yVelocity = 0
        }
        this.pipesPairs.forEach(pair => pair.movePipe(this.element.height, pipesDist, this.pipesPairs.length))
        // Draws bird
        this.ctx.drawImage(
            this.bird.img, 
            this.bird.x,
            this.bird.y,
            this.bird.width,
            this.bird.height
        )
        // Draws pipes
        this.pipesPairs.forEach(pair => {
            this.ctx.drawImage(
                pair.pipes.top.img,
                pair.x,
                pair.pipes.top.y,
                pair.width,
                pair.height
            )
            this.ctx.drawImage(
                pair.pipes.bottom.img,
                pair.x,
                pair.pipes.bottom.y,
                pair.width,
                pair.height
            )
        })
        // Game over
        if(this.collisionCheck()){
            this.ctx.font = '40px PublicPixel'
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.fillText('Game Over!', this.element.width/2, this.element.height/2)
            return false
        }
        return true
    }
}
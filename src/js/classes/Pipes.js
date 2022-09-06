import pipeUpImg from '../../assets/img/pipe_up.png'
import pipeDownImg from '../../assets/img/pipe_down.png'

export default class Pipes {
    constructor(initialX, gapSize, xSpeed, width, height) {
        this.gapSize = gapSize
        this.xSpeed = xSpeed
        this.width = width
        this.height = height
        this.x = initialX   // x coordinate
        this.hasScoreInc = false    // Used to define whether the game should increase the score when the pipes pass through the bird position
        this.pipes = {
            top: {
                img: new Image(),
                y: 0,
                get yBottom(){return height + this.y}   // y coordinate of the lower edge
            },
            bottom: {
                img: new Image(),
                y: 0
            }
        }
 
    }

    /**
     * Loads the image files from source.
     * @returns {Promise} Resolves on load finish. Rejects on error.
     */
    async loadImg(){
        const loadTop = () => {
            this.pipes.top.img.src = pipeDownImg
            return new Promise((resolve, reject) => {
                this.pipes.top.img.onload = () => resolve()
                this.pipes.top.img.onerror = () => reject()
            })
        }
        const loadBottom = () => {
            this.pipes.bottom.img.src = pipeUpImg
            return new Promise((resolve, reject) => {
                this.pipes.bottom.img.onload = () => resolve()
                this.pipes.bottom.img.onerror = () => reject()
            })
        }
        let error = null
        try{
            await loadTop()
            await loadBottom()
        }
        catch(e){ error = e }
        return new Promise((resolve, reject) => {
            if(error === null) resolve()
            else reject(error)
        })
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
     * Moves the pipes' xSpeed units left. Returns whether the score should be increased or not
     * @param {Number} canvasHeight Canvas height
     * @param {Number} canvasWidth Canvas width
     * @param {Number} nOfPairs Number of pairs of pipes rendered in the canvas
     * @param {Number} birdX x coordinate of the center of the bird (or where the game should update the score)
     * @returns {Boolean} true if the score should be increased, false otherwise
    */
    movePipe(canvasHeight, pipesDist, nOfPairs, birdX){
        this.x -= this.xSpeed
        // Rollover check
        if(this.x <= 0 - this.width){
            this.x = pipesDist + nOfPairs*this.width
            this.setY(canvasHeight)
            this.hasScoreInc = false    // Resets the score update check
        }

        // Score update check
        if (!this.hasScoreInc && (this.x + this.width)/2 <= birdX){
            this.hasScoreInc = true
            return true
        }
        return false
    }
}
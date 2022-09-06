import birdImg from '../../img/bird2.png'

const imgScaling = 3; // May be changed for different rendering sizes of the bird

export default class Bird{
    /**
     * Setup the bird (player)
     * @param {Number} yThrust Ammount of vertical velocity earned with each flap
    */
    constructor(yThrust){
        this.yThrust = -yThrust // Y axis is reversed on canvas
        this.yVelocity = 0
        this.img = new Image()    
    }
    
    /**
     * Loads the image file from source.
     * @param {Number} canvasCenterX x coordinate of the center of the canvas
     * @param {Number} canvasCenterY y coordinate of the center of the canvas
     * @returns {Promise} Resolves on load finish. Rejects on error.
     */
    loadImg(canvasCenterX, canvasCenterY){
        this.img.src = birdImg
        
        return new Promise((resolve, reject) => {
            this.img.onload = () => {
                this.width = this.img.width * imgScaling
                this.height = this.img.height * imgScaling
                this.x = canvasCenterX/2  - (this.width/2),
                this.y = canvasCenterY - (this.height/2)
                
                resolve()
            }
            this.img.onerror = () => reject('Error')
        })
    }

    /**
     * Thrusts the bird up
     */
    flap(){
        const maxVelocity = 3*this.yThrust
        this.yVelocity += this.yThrust
        if(this.yVelocity < maxVelocity) // Remember those values are negative
            this.yVelocity = maxVelocity
    }            
}
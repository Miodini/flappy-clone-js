import birdImg from '../../assets/img/bird2.png'

const imgScaling = 3; // May be changed for different rendering sizes of the bird

export default class Bird{
    /**
     * Setup the bird (player)
     * @param {Number} canvasCenterX - x coordinate of the center of the canvas
     * @param {Number} canvasCenterY - y coordinate of the center of the canvas
     * @param {Number} yThrust - Ammount of vertical velocity earned with each flap
    */
    constructor(canvasCenterX, canvasCenterY, yThrust){
        this.isloaded = false   // Remains false until the image file gets loaded
        this.yThrust = -yThrust // Y axis is reversed on canvas
        this.yVelocity = 0
        this.img = new Image()
        this.img.src = birdImg
  
        const width = this.img.width * imgScaling
        const height = this.img.height * imgScaling
        this.pos = {
            x: canvasCenterX/2  - (width/2),
            y: canvasCenterY - (height/2)
        }
        this.width = width
        this.height = height
        this.img.onload = () => this.isloaded = true
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
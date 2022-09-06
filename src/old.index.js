// Funções auxiliares
function getPixel(element, propertyName){
    return parseInt(element.style[propertyName].split('px')[0])
}

class Game {
    /**
     * Main class for running the game
     * @param {Object} [settings] - Contains some settings of the game
     * @param {Number} [settings.upSpeed] - Upwards pixel displacement per frame
     * @param {Number} [settings.downSpeed] - Downwards pixel displacement per frame
     * @param {Number} [settings.xSpeed] - Horizontal pixel displacement per frame
     * @param {Number} [settings.xPipeDist] - Amount of pixel between 2 consecutives pipes (horizontal)
     * @param {Number} [settings.yPipeDist] - Amount of pixel between 2 column of pipes (vertical) 
    */
    constructor(settings) {
        // Sets unset settings
        this.settings = settings || {}
        this.settings.upSpeed ||= 3
        this.settings.downSpeed ||= 2
        this.settings.xSpeed ||= 1
        this.settings.xPipeDist ||= 350
        this.settings.yPipeDist ||= 250
        
        this.pontos = new Score()
        this.passarinho = new Passarinho(this.settings.upSpeed, this.settings.downSpeed)
        
        this.canos = [
            new ParDeCanos(this.settings.yPipeDist, this.settings.xSpeed, this.pontos, this.passarinho),
            new ParDeCanos(this.settings.yPipeDist, this.settings.xSpeed, this.pontos, this.passarinho),
            new ParDeCanos(this.settings.yPipeDist, this.settings.xSpeed, this.pontos, this.passarinho),
            new ParDeCanos(this.settings.yPipeDist, this.settings.xSpeed, this.pontos, this.passarinho),
        ]
        this.gameRect = document.querySelector('.screen').getBoundingClientRect()
        
        this.canos.forEach((ele, index) => {
            ele.setPipePos(this.gameRect.width + (index * this.settings.xPipeDist))
        })
        //Setups iniciais
        const startText = document.querySelector('.start')
        document.querySelector('.screen').removeChild(startText)
        this.canos.forEach(e => e.changeHeights())
        this.passarinho.recenter()
    }
    /**
     * Starts the game loop
    */
    start(){ 
        this.timer = setInterval(() => {
            this.passarinho.animate()
            this.canos.forEach(e => {
                // Game over
                if(e.movePipe()){
                    clearInterval(this.timer)
                    const gameOver = document.createElement('div')
                    gameOver.classList = 'gameover'
                    gameOver.innerHTML = '<h2>Game Over!</h2><span>Press the button on top right corner to restart.</span>'
                    document.querySelector('.screen').appendChild(gameOver)
                }
            })            
        }, 5)
    }
}
let game
/* Add attributes to this settings variable to adjust the game's settings
 * They're described above the Game class constructor
 * Click the restart button to apply the changes
*/
let settings = {}
function startGame(){
    game = new Game(settings)
    game.start()
}
function restartGame(){
    clearInterval(game.timer)
    document.querySelector('.screen').innerHTML = '<div class="start">Hold any key to start flying.</div>'
    window.onkeyup = null
    window.onkeydown = startGame
}
function showSettings(){
    alert("Work in Progress! For the time being, you can change games settings via console (if you're a pro-grammer).")
}
// Listeners
window.onkeydown = startGame
document.querySelector('#restart').onclick = restartGame
document.querySelector('#settings').onclick = showSettings
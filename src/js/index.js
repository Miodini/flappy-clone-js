import Canvas from './classes/Canvas'
import '../assets/css/index.css'

let canvas = new Canvas(750)

function restartGame(){
    canvas = new Canvas(750)
    document.getElementById('game').remove()
    canvas.load()
}

window.onload = function(){
    const restartBtn = document.getElementById('restart')
    restartBtn.onclick = restartGame
    canvas.load()
}
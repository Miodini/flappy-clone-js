import Canvas from './imports/Canvas'
import '../assets/css/index.css'

function animate(){
    canvas.draw()
    requestAnimationFrame(animate)
}

const canvas = new Canvas(750)
canvas.onload = animate
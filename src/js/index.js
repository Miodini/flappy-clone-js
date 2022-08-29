import Canvas from './classes/Canvas'
import '../assets/css/index.css'

function animate(){
    canvas.draw()
    requestAnimationFrame(animate)
}

const canvas = new Canvas(750)
canvas.load().then(() => animate())
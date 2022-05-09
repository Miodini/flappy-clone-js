import Canvas from './imports/Canvas'
import '../assets/css/index.css'

const canvas = new Canvas()
canvas.onLoad(animate)

function animate(){
    canvas.draw()
    requestAnimationFrame(animate)
}
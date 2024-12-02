import globals from "./globals..js"
import { initHTMLElements, initVars } from "./initialize.js"
import update from "./gameLogic.js"
import render from "./gameRender.js"

////////////////////////////////////
// GAME INIT
////////////////////////////////////

window.onload = init

function init() {
  
  // inicializamos los elementos HTML: Canvas, Context, Caja de texto de pruebas
  initHTMLElements()

  // inicialización de las variables de juego
  initVars()

  // start the first frame request
  window.requestAnimationFrame(gameLoop)

}

////////////////////////////////////
// GAME EXECUTE
////////////////////////////////////

// bucle principal de ejecución
function gameLoop (timeStamp) {
  
  // keep requesting new frames
  window.requestAnimationFrame(gameLoop, global.canvas)

  // tiempo resl de ciclo de ejecución
  const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000

  // tiempo anterior de ciclo de ejecución
  globals.previousCycleMilliseconds = timeStamp

  // vbariable que corrige el tiempo de frame debido a retrqsos con respecto al tiempo objetivo (frameTimeObj)
  globals.deltaTime += elapsedCycleSeconds

  if (globals.deltaTime >= globals.frameTimeOpj){

    // update the game logic. gameLogic.js
    

  }
}
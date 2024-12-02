import globals from "./globals"
import { Game, FPS } from "./constants"

// funcionque inicializa los elementos HTML
function initHTMLElements() {
  
  // canvas
  globals.canvas = document.getElementById('gameScreen')

  // context
  globals.ctx = globals.canvas.getContext('2d')

  // eliminación del Anti-Aliasing
  globals.ctx.imageSmoothingEnabled = false

  // caja de texto para pruebas
  globals.txtPruebas = document.getElementById('txtPruebas')
  
}

// funcion que inicializa las variables del juego
function initVars(){

  // inicializamos las variables de gestión de tiempo
  globals.previousCycleMilliseconds = 0
  globals.deltaTime = 0
  globals.frameTimeObj = 1 / FPS // frame time in seconds

  // inicializamos el estado del juego
  globals.gameState = Game.LOADING

}

// exportar funciones
export {
  initHTMLElements,
  initVars
}
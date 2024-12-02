import globals from "./globals.js"
import { Game, FPS, SpriteID, State } from "./constants.js"
import Sprite from "./Sprite.js"
import ImageSet from "./ImageSet.js"
import Frames from "./Frames.js"

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
function initVars() {

  // inicializamos las variables de gestión de tiempo
  globals.previousCycleMilliseconds = 0
  globals.deltaTime = 0
  globals.frameTimeObj = 1 / FPS // frame time in seconds

  // inicializamos el estado del juego
  globals.gameState = Game.LOADING
}

// carga de activos: TILEMAPS, IMAGES, SOUNDS
function loadAssets() {
  // load the tileSet image
  globals.tileSet = new Image()
  globals.tileSet.addEventListener("load", loadHandler, false)
  globals.tileSet.src = "./images/player.png"
  globals.assetsToLoad.push(globals.tileSet)
}

// funcion que se llama cada vez que se carga un archivo
function loadHandler() {
  globals.assetsLoaded++

  // una vez se han cargado todos los activos pasamos
  if (globals.assetsLoaded === globals.assetsToLoad.length) {

    // remove the load event listener
    globals.tileSet.removeEventListener("load", loadHandler, false)

    console.log(globals.assetsToLoad[0]);
    console.log("Assets finish loading")

    // start the game
    globals.gameState = Game.PLAYING
  }
}

function initsprites() {
  initPlayer()
}

function initPlayer() {
  // crear las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(44, 57, 64, 10, 6)

  // crear los datos de la animación. 8 frames / state
  const frames = new Frames(8)

  // crear nuestro sprite
  const player = new Sprite(SpriteID.PLAYER, State.UP, 100, 70, imageSet, frames)

  // añadir el player al array de sprites
  globals.sprites.push(player)
}

// exportar funciones
export {
  initHTMLElements,
  initVars,
  loadAssets,
  initsprites,
}
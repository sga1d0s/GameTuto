// variables globales
import { Game } from "./constants.js"

export default {

  // acceso a canvas y al context
  canvas: {},
  ctx: {},
  canvasUHD: {},
  ctxUHD: {},

  // estado del juego
  gameState: Game.INVALID,

  // estado de ciclo anterior (milisegundos)
  previousCycleMilliseconds: -1,

  // tiempo de ciclo de juego real (seconds)
  deltaTime: 0,

  // tiempo de ciclo objetivo (seconds, constante)
  frameTimeObj: 0,

  // objeto que guarda los datos de imagen (tileSet)
  tileSets: [],

  // array que guarda la lista de elementos a cargar
  assetsToLoad: [],

  // variable que indica el número de elementos cargados
  assetsLoaded: 0,

  // array con los datos de los sprites
  sprites: [],

  cycleRealTime: 0,

  // datos de nivel
  level: {},

  // tiempo de juego
  gameTime: -1,

  // temporización nivel
  levelTime: {},

  // objeto que guarda el estado de la tecla pulsada
  action: {},

  // life
  life: 0,
}
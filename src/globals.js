// variables globales
import { Game } from "./constants.js"

export default {

  // acceso a vanvas y al context
  canvas: {},
  ctx: {},

  // estado del juego
  gameState: Game.INVALID,

  // estado de ciclo anterior (milisegundos)
  previousCycleMilliseconds: -1,

  // tiempo de ciclo de juego real (seconds)
  deltaTime: 0,

  // tiempo de ciclo objetivo (seconds, constante)
  frameTimeObj: 0,

  // caja de texto para mostrar datos de depuración
  txtPruebas: {},

  // objeto que guarda los datos de imagen (tileSet)
  tileSet: {},

  // array que guarda la lista de elementos a cargar
  assetsToLoad: [],

  // variable que indica el número de elementos cargados
  assetsLoaded: 0,

  // array con los datos de los sprites
  sprites: [],
}
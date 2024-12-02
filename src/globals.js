// variables globales
import { Game } from "./constants"

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
  txtPruebas: {}

}
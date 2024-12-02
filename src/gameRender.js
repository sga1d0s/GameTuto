import globals from "./globals.js"
import { Game } from "./constants.js"

// funcion que renderiza los graficos
export default function render() {

  // change what the game is doing based on the game state
  switch (globals.gameState) {
    case Game.LOADING:
      // draw loading spinner
      break

    case Game.PLAYING:
      drawGame()
      break

    default:
      console.error("Error: Game State invalid")
  }

}

function drawGame() {
  // borramos la pantalla entera
  globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height)

  // pintamos los FPS en pantalla
  globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 30, 30)
}
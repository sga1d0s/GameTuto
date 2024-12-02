import globals from "./globals"
import { Game } from "./constants"

// funcion que renderiza los graficos
export default function render(){
  
  // change what the game is doing based on the game state
  switch(globals.gameState){
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

function drawGame(){
  // ... a completar
}
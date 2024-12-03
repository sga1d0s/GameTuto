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
  // globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 30, 30)

  drawSprites()
}

function renderSprite(sprite) {

  // calcular la posicion del tile de inicio
  const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize
  const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize

  // calcular la posición en el tile a dibujar
  const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset
  const yTile = yPosInit+ sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset

  const xPos = Math.floor(sprite.xPos)
  const yPos = Math.floor(sprite.yPos)

  // dibujar el nuevo fotograma del sprite en la posiciónadecuada
  globals.ctx.drawImage(
    globals.tileSet,
    xTile, yTile,
    sprite.imageSet.xSize, sprite.imageSet.ySize,
    xPos, yPos,
    sprite.imageSet.xSize, sprite.imageSet.ySize,
  )
}

// dibunar los sprites
function drawSprites() {
  for (let i = 0; i < globals.sprites.length; ++i) {
    const sprite = globals.sprites[i];

    // TEST: dibuja un rectangulo verde alrededor del sprite
    drawSpriteRectangle(sprite)

    renderSprite(sprite)
  }
}

// funcion para dibujar un rectangulo y así ajustar el sprite

function drawSpriteRectangle(sprite) {
  // datos del sprite
  const x1 = Math.floor(sprite.xPos)
  const y1 = Math.floor(sprite.yPos)
  const w1 = sprite.imageSet.xSize
  const h1 = sprite.imageSet.ySize

  globals.ctx.fillStyle = "green"
  globals.ctx.fillRect(x1, y1, w1, h1)
}
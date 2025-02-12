import globals from "./globals.js"
import { Game, Tile, ParticleID, ParticleState } from "./constants.js"

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
  // borramos la pantalla entera y UHD
  globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height)
  globals.ctxUHD.clearRect(0, 0, globals.canvasUHD.width, globals.canvasUHD.height)

  // mover cámara
  moveCamera()

  // dibujar el mapa (nivel)
  renderMap()

  // dibujar los elementos
  drawSprites()

  // restaurar cámara
  restoreCamera()

  // dibujar las particulas
  renderParticles()

  // dibujamos el UHD
  renderUHD()
}

// función que dibuja el mapa
function renderMap() {
  const brickSize = globals.level.imageSet.gridSize
  const levelData = globals.level.data

  // dibujamos el mapa
  const num_fil = levelData.length
  const num_col = levelData[0].length

  for (let i = 0; i < num_fil; i++) {
    for (let j = 0; j < num_col; j++) {
      const xTile = (levelData[i][j] - 1) * brickSize
      const ytile = 0
      const xPos = j * brickSize
      const yPos = i * brickSize

      // dibujar el nuevo fotograma del sprite en la posicion adecuada
      globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_32],
        xTile, ytile,
        brickSize, brickSize,
        xPos, yPos,
        brickSize, brickSize
      )
    }
  }
}

function renderSprite(sprite) {

  // calcular la posicion del tile de inicio
  const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize
  const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize

  // calcular la posición en el tile a dibujar
  const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset
  const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset

  const xPos = Math.floor(sprite.xPos)
  const yPos = Math.floor(sprite.yPos)

  // dibujar el nuevo fotograma del sprite en la posiciónadecuada
  globals.ctx.drawImage(
    globals.tileSets[Tile.SIZE_64],
    xTile, yTile,
    sprite.imageSet.xSize, sprite.imageSet.ySize,
    xPos, yPos,
    sprite.imageSet.xSize, sprite.imageSet.ySize,
  )
}

// dibujar los sprites
function drawSprites() {
  for (let i = 0; i < globals.sprites.length; ++i) {
    const sprite = globals.sprites[i];

    // TEST: dibuja un rectangulo verde alrededor del sprite
    // drawSpriteRectangle(sprite)

    renderSprite(sprite)

    // TEST: dibuja el hitbox
    drawHitBox(sprite)
  }
}

// dibujar partículas
function renderParticles() {
  for (let i = 0; i < globals.particles.length; i++) {
    const particle = globals.particles[i];
    renderParticle(particle)
  }
}

function renderParticle(particle) {
  const type = particle.id

  switch (type) {
    case ParticleID.EXPLOSION:
      renderExplosionParticle(particle)
      break;

    case ParticleID.FIRE:
      // renderFireParticle(particle)
      break;

    default:
      break;
  }
}

function renderExplosionParticle(particle) {
  if (ParticleState != ParticleState.OFF) {
    globals.ctx.fillStyle = 'blue';
    globals.ctx.globalAlpha = particle.alpha;
    globals.ctx.beginPath();

    /// partículas
    globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
    globals.ctx.fill();
    globals.ctx.globalAlpha = 1.0
  }
}

// funcion para dibujar un rectangulo y así ajustar el sprite
function drawSpriteRectangle(sprite) {
  // datos del sprite
  const x1 = Math.floor(sprite.xPos)
  const y1 = Math.floor(sprite.yPos)
  const w1 = sprite.imageSet.xSize
  const h1 = sprite.imageSet.ySize

  // dibujo en verde
  globals.ctx.fillStyle = "green"
  globals.ctx.fillRect(x1, y1, w1, h1)
}

function drawHitBox(sprite) {
  // datos del sprite
  const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
  const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
  const w1 = sprite.hitBox.xSize;
  const h1 = sprite.hitBox.ySize;

  globals.ctx.strokeStyle = "red";
  globals.ctx.strokeRect(x1, y1, w1, h1);
}

// funcion para dibujar los elementos del UHD
function renderUHD() {
  // TEST: datos hardcodeados
  const score = 1500
  const highScore = 130000
  const life = 40
  const time = globals.levelTime.value

  // draw score
  globals.ctxUHD.font = '8px emulogic'
  globals.ctxUHD.fillStyle = 'lightblue'
  globals.ctxUHD.fillText("SCORE", 8, 8)
  globals.ctxUHD.fillStyle = 'lightgray'
  globals.ctxUHD.fillText(" " + score, 8, 16)

  // draw HIGH score
  globals.ctxUHD.fillStyle = 'lightblue'
  globals.ctxUHD.fillText("HIGH SCORE", 72, 8)
  globals.ctxUHD.fillStyle = 'lightgray'
  globals.ctxUHD.fillText(" " + highScore, 72, 16)

  // draw life
  globals.ctxUHD.fillStyle = 'lightblue'
  globals.ctxUHD.fillText("LIFE", 168, 8)
  globals.ctxUHD.fillStyle = 'lightgray'
  globals.ctxUHD.fillText(" " + globals.life, 168, 16)

  // round corners. (Remove 1 pixel per corner)
  globals.ctxUHD.fillStyle = 'black'
  globals.ctxUHD.fillRect(168, 9, 1, 1)
  globals.ctxUHD.fillRect(168, 15, 1, 1)
  globals.ctxUHD.fillRect(168 + life - 1, 9, 1, 1)
  globals.ctxUHD.fillRect(168 + life - 1, 15, 1, 1)

  // draw time
  globals.ctxUHD.fillStyle = 'lightblue'
  globals.ctxUHD.fillText("TIME", 224, 8)
  globals.ctxUHD.fillStyle = 'lightgray'
  globals.ctxUHD.fillText(time, 224, 16)
}

// funciones para el movimiento de cámera
function moveCamera() {

  const xTranslation = -globals.camera.x
  const yTranslation = -globals.camera.y

  globals.ctx.translate(xTranslation, yTranslation)
}

function restoreCamera() {
  globals.ctx.setTransform(1, 0, 0, 1, 0, 0)
}
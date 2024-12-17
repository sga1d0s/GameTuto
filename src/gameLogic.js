import globals from "./globals.js"
import { Game, SpriteID, State } from "./constants.js"

export default function update() {

  // change what the game is doing based on the game state
  switch (globals.gameState) {
    case Game.LOADING:
      console.log("Loading assets...")
      break

    case Game.PLAYING:
      playGame()
      break

    default:
      console.error("Error: Game State invalid")
  }
}

function updateJoker(sprite) {
  // actualizar el estado de las variables del pirata
  sprite.xPos = 55
  sprite.yPos = 7

  sprite.state = State.STILL

  sprite.frames.frameCounter = 0
}

// funcion que actualiza el pirata
function updatePirate(sprite) {

  // máquina de estados del pirata
  switch (sprite.state) {

    case State.RIGHT_2:
      // si semueve a la derecha asignamos velocidad en X positiva
      sprite.physics.vx = sprite.physics.vLimit
      break

    case State.LEFT_2:
      // si se mueve a la izquierda asignamos velocidad en X negativa
      sprite.physics.vx = -sprite.physics.vLimit
      break

    default:
      console.error("Error: State invalid")
  }

  // calcular distancia que se mueve (X = X + Vt)
  sprite.xPos += sprite.physics.vx * globals.deltaTime

  // acualizar la animación
  updateAnimationFrame(sprite)

  // cambio de dirección
  updateDirectionRandom(sprite)

  const isCollision = calculateCollisionWithBorders(sprite)
  if (isCollision){
    swapDirection(sprite)
  }
}

function updateAnimationFrame(sprite) {
  // aumentar el contador de tiempo entre frames
  sprite.frames.frameChangeCounter++

  // si hemos llegado al maximo de frames reiniciamos el contador (animación cíclica)
  if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
    // cambiar de frame y reseseamos el contador de cambio de frame
    sprite.frames.frameCounter++
    sprite.frames.frameChangeCounter = 0
  }
}

function swapDirection(sprite) {
  sprite.state = sprite.state === State.RIGHT_2 ? State.LEFT_2 : State.RIGHT_2
}

function updateDirectionRandom(sprite) {
  // incrementar el tiempo para cambio de dirección
  sprite.directionChangeCounter += globals.deltaTime

  if (sprite.directionChangeCounter > sprite.maxTimeToChangeDirection) {
    // resetear el contador
    sprite.directionChangeCounter = 0

    // actualizar el tiempo de cambio de dirección aleatoriamente, entre 1 y 8 segundos
    sprite.maxTimeToChanteDirection = Math.floor(Math.random() * 8) + 1

    // cambiar la dirección
    swapDirection(sprite)
  }
}

function updatePlayer(sprite) {
  // actualizar el estado de las variables del pirata
  sprite.xPos = 55
  sprite.yPos = 137

  sprite.state = State.LEFT

  sprite.frames.frameCounter = 2
}

function updateSprites() {
  for (let i = 0; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i]
    updateSprite(sprite)
  }
}

function updateGameTime() {
  // incrementar el contador
  globals.gameTime += globals.deltaTime
}

// actualizadión del timer
function updateLevelTime() {
  // incrementamos el contador de cambio de valor
  globals.levelTime.timeChangeCounter += globals.deltaTime

  // si ha pasado el tiempo necesario, cambiamos el valor del timer
  if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue) {
    globals.levelTime.value--

    // restear timeChangecounter
    globals.levelTime.timeChangeCounter = 0
  }
}

// actualiza cada tipo de sprite
function updateSprite(sprite) {
  const type = sprite.id

  switch (type) {

    // caso jugador
    case SpriteID.PLAYER:
      updatePlayer(sprite)
      break

    // caso pirata
    case SpriteID.PIRATE:
      updatePirate(sprite)
      break

    // caso pirata
    case SpriteID.JOKER:
      updateJoker(sprite)
      break

    // caso del enemigo
    default:
      break
  }
}

function calculateCollisionWithBorders(sprite) {
  let isCollision = false
  // colision con el borde derecho de la pantalla
  if (sprite.xPos + sprite.imageSet.xSize > globals.canvas.width) {
    isCollision = true
  } else if (sprite.xPos < 0) {
    isCollision = true
  }
  return isCollision
}

function playGame() {
  updateSprites()
  updateGameTime()
  updateLevelTime()
}
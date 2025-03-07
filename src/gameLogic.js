import globals from "./globals.js"
import { Game, SpriteID, State, ParticleState, ParticleID } from "./constants.js"
import detectCollisions from "./collisions.js"
import {createFireParticle} from "./initialize.js"

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

  if (isCollision) {
    swapDirection(sprite)
  }
}

function updateAnimationFrame(sprite) {

  switch (sprite.state) {
    // reduce los el contador de frames si está parado
    case State.STILL_UP:
    case State.STILL_LEFT:
    case State.STILL_DOWN:
    case State.STILL_RIGHT:
      sprite.frames.frameCounter = 0
      sprite.frames.frameChangeCounter = 0
      break;

    default:
      // aumentar el contador de tiempo entre frames
      sprite.frames.frameChangeCounter++

      // si hemos llegado al maximo de frames reiniciamos el contador (animación cíclica)
      if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
        // cambiar de frame y reseseamos el contador de cambio de frame
        sprite.frames.frameCounter++
        sprite.frames.frameChangeCounter = 0
      }

      // si hemos llegado al máximo de frames reiniciamos el contador
      if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
        sprite.frames.frameCounter = 0
      }
      break;
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
    sprite.maxTimeToChangeDirection = Math.floor(Math.random() * 8) + 1

    // cambiar la dirección
    swapDirection(sprite)
  }
}

function updatePlayer(sprite) {
  // lectura de teclado. Asignamos dirección de tecla
  readKeyboardAndAssignState(sprite)

  switch (sprite.state) {
    case State.UP:
      // si se mueve hacia arriba asignamos vy (-)
      sprite.physics.vx = 0
      sprite.physics.vy = -sprite.physics.vLimit
      break;

    case State.DOWN:
      // si se mueve hacia abajo asignamos vy (+)
      sprite.physics.vx = 0
      sprite.physics.vy = sprite.physics.vLimit
      break;

    case State.RIGHT:
      // si se mueve hacia derecha asignamos vy (+)
      sprite.physics.vx = sprite.physics.vLimit
      sprite.physics.vy = 0
      break;

    case State.LEFT:
      // si se mueve hacia izquierda asignamos vy (-)
      sprite.physics.vx = -sprite.physics.vLimit
      sprite.physics.vy = 0
      break;

    default:
      // caso de estar parado
      sprite.physics.vx = 0
      sprite.physics.vy = 0
      break;
  }

  // calculamos distancia que se mueve (X = X + Vt)
  sprite.xPos += sprite.physics.vx * globals.deltaTime
  sprite.yPos += sprite.physics.vy * globals.deltaTime

  // actualizamos la animación
  updateAnimationFrame(sprite)
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

function readKeyboardAndAssignState(sprite) {
  sprite.state = globals.action.moveLeft ? State.LEFT :
    globals.action.moveRight ? State.RIGHT :
      globals.action.moveUp ? State.UP :
        globals.action.moveDown ? State.DOWN :
          sprite.state === State.LEFT ? State.STILL_LEFT :
            sprite.state === State.RIGHT ? State.STILL_RIGHT :
              sprite.state === State.UP ? State.STILL_UP :
                sprite.state === State.DOWN ? State.STILL_DOWN :
                  sprite.state

}

// actualiza la vida por colision
function updateLife() {
  for (let i = 1; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i]

    // reducimos si hay colision
    if (sprite.isCollidingWithPlayer) {
      globals.life--
    }
  }
}

function playGame() {
  // actualiza la física de sprites
  updateSprites()

  // actualiza particulas
  updateParticles()

  // colisiones
  detectCollisions()

  // actualizar la lógica del juego
  updateGameTime()

  // catualizar posicion de camara
  updateCamera()

  // actualizar las variables del juego
  updateLevelTime()
  updateLife()

}

// actualizar posición de camara
function updateCamera() {
  const player = globals.sprites[0]

  globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2)
  globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) / 2)
}

// actualizar PARTÍCULAS
function updateParticles() {
  for (let i = 0; i < globals.particles.length; i++) {
    const particle = globals.particles[i];

    // si se borra una partícula se crea otra
    if (particle.id === ParticleID.FIRE && particle.state === ParticleState.OFF) {
      globals.particles.splice(i, 1)
      i--
      createFireParticle()
    } else {
      updateParticle(particle)
    }
    
  }
}

function updateParticle(particle) {
  const type = particle.id

  switch (type) {
    case ParticleID.EXPLOSION:
      updateExplosionParticle(particle)
      break;

    case ParticleID.FIRE:
      updateFireParticle(particle)
      break

    default:
      break;
  }
}

function updateExplosionParticle(particle) {
  particle.fadeCounter += globals.deltaTime

  // coger velocidades de los arrays
  switch (particle.state) {

    case ParticleState.ON:
      if (particle.fadeCounter > particle.timeToFade) {
        particle.fadeCounter = 0
        particle.state = ParticleState.FADE
      }
      break;

    case ParticleState.FADE:
      particle.alpha -= 0.01

      if (particle.alpha <= 0) {
        particle.state = ParticleState.OFF
      }
      break

    case ParticleState.OFF:
      particle.alpha = 0
      globals.particles = []
      break

    default:
      break;
  }

  particle.physics.vx += particle.physics.ax * globals.deltaTime
  particle.physics.vy += particle.physics.ay * globals.deltaTime

  // limitamos la velocidad a 1 para que no haya cambio de sentido
  const velModule = Math.sqrt(Math.pow(particle.physics.vx, 2) + Math.pow(particle.physics.vy, 2));

  if (velModule < 1) {
    particle.physics.vx = 0
    particle.physics.vy = 0
  }

  particle.yPos += particle.physics.vy * globals.deltaTime
  particle.xPos += particle.physics.vx * globals.deltaTime
}

function updateFireParticle(particle) {
  //coger velocidades de los arrays
  switch (particle.state) {
    case ParticleState.ON:
      particle.radius -= 0.1
      if (particle.radius < 2) {
        particle.state = ParticleState.FADE
      }
      break;

    case ParticleState.FADE:
      particle.alpha -= 0.3
      if (particle.alpha <= 0) {
        particle.state = ParticleState.OFF
      }
      break;

    case ParticleState.OFF:
      particle.alpha = 0
      globals.particles = []
    break

    default:
      break;
  }

  particle.xPos += particle.physics.vx * globals.deltaTime
  particle.yPos += particle.physics.vy * globals.deltaTime

}
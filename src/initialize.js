import globals from "./globals.js"
import { Game, FPS, SpriteID, State, ParticleID, ParticleState } from "./constants.js"
import Sprite, { Pirate } from "./Sprite.js"
import ImageSet from "./ImageSet.js"
import Frames from "./Frames.js"
import { Level, level1 } from "./Level.js"
import Timer from "./Timer.js"
import Physics from "./Physics.js"
import { keyupHandler, keydownHandler } from "./events.js"
import HitBox from "./HitBox.js"
import Camera from "./Camera.js"
import { ExplosionParticle, FireParticle } from "./Particle.js"

// funcionque inicializa los elementos HTML
function initHTMLElements() {
  // canvas y context Screen
  globals.canvas = document.getElementById('gameScreen')
  globals.ctx = globals.canvas.getContext('2d')

  // canvas y context UHD
  globals.canvasUHD = document.getElementById('gameUHD')
  globals.ctxUHD = globals.canvasUHD.getContext('2d')

  // eliminación del Anti-Aliasing
  globals.ctx.imageSmoothingEnabled = false
}

// funcion que inicializa las variables del juego
function initVars() {
  // inicializar las variables de gestión de tiempo
  globals.previousCycleMilliseconds = 0
  globals.deltaTime = 0
  globals.frameTimeObj = 1 / FPS // frame time in seconds

  // inicializar el estado del juego
  globals.gameState = Game.LOADING

  // iniciar el contador del juego
  globals.gameTime = 0

  // iniciar el estado de las acciones
  globals.action = {
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
  }

  // variable de vida de player
  globals.life = 400
}

// carga de activos: TILEMAPS, IMAGES, SOUNDS
function loadAssets() {

  let tileSet;
  // load the spritesheet image
  tileSet = new Image()
  tileSet.addEventListener("load", loadHandler, false)
  tileSet.src = "./images/spritesheet.png"
  globals.tileSets.push(tileSet)
  globals.assetsToLoad.push(tileSet)

  // load the bricks image
  tileSet = new Image()
  tileSet.addEventListener("load", loadHandler, false)
  tileSet.src = "./images/bricks.png"
  globals.tileSets.push(tileSet)
  globals.assetsToLoad.push(tileSet)
}

// funcion que se llama cada vez que se carga un archivo
function loadHandler() {
  globals.assetsLoaded++

  // una vez se han cargado todos los activos pasar
  if (globals.assetsLoaded === globals.assetsToLoad.length) {

    for (let i = 0; i < globals.tileSets.length; i++) {
      // remove the load event listener
      globals.tileSets[i].removeEventListener("load", loadHandler, false)
    }

    console.log("Assets finish loading")

    // start the game
    globals.gameState = Game.PLAYING
  }
}

// PARTÍCULAS
function initParticles() {
  // initExplosion()
  initFire()
}

// particulas EXPLOSIOM
function initExplosion() {
  const numParticles = 300
  const xInit = 100
  const yInit = 50
  const radius = 2.5
  const alpha = 1

  for (let i = 0; i < numParticles; i++) {

    const velocity = Math.random() * 30 + 15
    const acceleration = 2
    const timeToFade = 1 * Math.random() + 1

    const physics = new Physics(velocity, acceleration)

    const particle = new ExplosionParticle(ParticleID.EXPLOSION, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade)

    // velocidad según antulo aleatorio
    const randomAngle = Math.random() * 2 * Math.PI
    particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle)
    particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle)

    particle.physics.ax = -particle.physics.aLimit * Math.cos(randomAngle)
    // particle.physics.ay = -particle.physics.aLimit * Math.sin(randomAngle)
    particle.physics.ay = -100 * Math.sin(-90)

    globals.particles.push(particle)
  }
}

// partículas FUEGO
function initFire() {
  const numParticles = 100

  for (let i = 0; i < numParticles; i++) {
    createFireParticle()
  }
}

function createFireParticle() {
  const alpha = 1.0
  const velocity = Math.random() * 20 + 10
  const physics = new Physics(velocity)

  const xInit = Math.random() * 50 + 100
  const yInit = 100

  const radius = 8 * Math.random() + 2

  const particle = new FireParticle(ParticleID.FIRE, ParticleState.ON, xInit, yInit, radius, alpha, physics)

  const randomAngle = Math.random() * Math.PI/ 3 + 3 * Math.PI / 2

  particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle)
  particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle)

  globals.particles.push(particle)
}

function initTimers() {
  // creamos timer de valor 200, con cambios cada 0.5 segundos
  globals.levelTime = new Timer(200, 0.5)
}

function initSprites() {
  initPlayer()
  initPirate()
  initJoker()
}

function initEvents() {
  // add the keyboard event listeners
  window.addEventListener("keydown", keydownHandler, false)
  window.addEventListener("keyup", keyupHandler, false)
}

function initJoker() {
  // crear las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(8, 0, 44, 57, 64, 10, 6)

  // crear los datos de la animación. 8 frames / state
  const frames = new Frames(3)

  // crear nuestro sprite
  const joker = new Sprite(SpriteID.JOKER, State.STILL, 100, 70, imageSet, frames)

  // añadir el player al array de sprites
  globals.sprites.push(joker)
}

function initPirate() {
  // crear las propiedades de las imagener
  const imageSet = new ImageSet(9, 0, 32, 47, 64, 17, 16)

  // crear los datos de la animación. 8 frames / state
  const frames = new Frames(8, 5)

  // crear objeto physics con el vLimit = 40 pixels second
  const physics = new Physics(40)

  // creamos objeto hitbox
  const hitBox = new HitBox(13, 46, 8, 0)

  const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1

  // crear nuestro sprite
  const pirate = new Pirate(SpriteID.PIRATE, State.RIGHT_2, 100, 100, imageSet, frames, physics, initTimeToChangeDirection, hitBox)

  // añadir el pirate al array de sprites
  globals.sprites.push(pirate)
}

function initPlayer() {
  // crear las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(0, 0, 44, 57, 64, 10, 6)

  // crear los datos de la animación. 8 frames / state
  const frames = new Frames(8, 5)

  // crear nuestro objeto physics con vLimit 40 pixels por segundo
  const physics = new Physics(40)

  // crear objeto hitbox
  const hitBox = new HitBox(16, 51, 14, 5)

  // crear nuestro sprite
  const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 100, 70, imageSet, frames, physics, hitBox)

  // añadir el player al array de sprites
  globals.sprites.push(player)
}

function initLevel() {
  // crear las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(0, 0, 32, 32, 32, 0, 0)

  // creamos y guardamos nuestro nivel
  globals.level = new Level(level1, imageSet)
}

function initCamera() {
  globals.camera = new Camera(0, 0)
}

// exportar funciones
export {
  initHTMLElements,
  initVars,
  loadAssets,
  initSprites,
  initLevel,
  initTimers,
  initEvents,
  initCamera,
  initParticles,
  createFireParticle
}
import globals from "./globals.js"
import { Block, State } from "./constants.js"

export default function detectCollisions() {
  // calcular colision del player con cada uno de los sprites
  for (let i = 1; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i]
    detectCollisionBetweenPlayerAndSprite(sprite)
  }

  // calcular colision delk player con los obstaculos del mapa
  detectCollisionBetweenPlayerAndMapObstacles()
}

function detectCollisionBetweenPlayerAndSprite(sprite) {
  // reset collision state
  sprite.isCollidingWithPlayer = false

  // nuestro player está en la posición 0
  const player = globals.sprites[0]

  // datos del player
  const x1 = player.xPos + player.hitBox.xOffset
  const y1 = player.yPos + player.hitBox.yOffset
  const w1 = player.hitBox.xSize
  const h1 = player.hitBox.ySize

  // nuestro player está en la posición 0
  const player2 = globals.sprites[1]

  // datos del otro sprite
  const x2 = player2.xPos + player2.hitBox.xOffset
  const y2 = player2.yPos + player2.hitBox.yOffset
  const w2 = player2.hitBox.xSize
  const h2 = player2.hitBox.ySize

  const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
  if (isOverlap) {
    // existe colisión
    sprite.isCollidingWithPlayer = true
  }
}

// funcion que calcula si 2 rectangulos interseccionan
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  let isOverlap

  // check x and y for overlap
  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
    isOverlap = false
  } else
    isOverlap = true
  return isOverlap
}

// devuelve el id del tile del mapa para las coordenadas xpos e ypos
function getMapTileId(xPos, yPos) {
  const brickSize = globals.level.imageSet.gridSize
  const levelData = globals.level.data

  const fil = Math.floor(yPos / brickSize)
  const col = Math.floor(xPos / brickSize)

  return levelData[fil][col]
}

// devuelve true si hay colision con un obstáculo determinado
function isCollidingWithObstacleAt(xPos, yPos, obstacleId) {

  let isColliding

  const id = getMapTileId(xPos, yPos)

  // calcular la colision con bloque de cristal
  if (id === obstacleId) {
    isColliding = true
  } else isColliding = false
  return isColliding
}

// calculo de colisiones con los bloques del mapa
function detectCollisionBetweenPlayerAndMapObstacles() {
  const player = globals.sprites[0]

  // eset collision state
  player.isCollidingWithObstacleOnTheRight = false;
  player.isCollidingWithObstacleOnTheLeft = false;
  player.isCollidingWithObstacleOnTheTop = false;
  player.isCollidingWithObstacleOnTheBottom = false;

  // variables to use
  let xPos
  let yPos
  let isCollidingOnPos1
  let isCollidingOnPos2
  let isCollidingOnPos3
  let isColliding
  let overlap

  const brickSize = globals.level.imageSet.gridSize
  const direction = player.state

  // ID del obstáculo
  const obstacleId = Block.CRYSTAL_1

  switch (direction) {
    case State.RIGHT:
      // primera colision en (xpos + xsize -1, ypos)
      xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1
      yPos = player.yPos + player.hitBox.yOffset
      isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // segunda colision en (xpos + xsize -1, ypos + bricksize)
      yPos = player.yPos + player.hitBox.yOffset + brickSize
      isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // ultima colision en (xpos + xsize - 1, ypos + ysize -1)
      yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1
      isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // habrá colision si toca alguno de los 3 bloques
      isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3

      if (isColliding) {
        // existe colision a la derecha
        player.isCollidingWithObstacleOnTheRight = true

        // AJUSTE: Calcular solapamiento y mover el personaje lo correspondiente
        overlap = Math.floor(xPos) % brickSize + 1
        player.xPos -= overlap
      }

      break;

    case State.LEFT:
      // primera colision en (xpos + xsize -1, ypos)
      xPos = player.xPos + player.hitBox.xOffset - 1
      yPos = player.yPos + player.hitBox.yOffset
      isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // segunda colision en (xpos + xsize -1, ypos + bricksize)
      yPos = player.yPos + player.hitBox.yOffset + brickSize
      isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // ultima colision en (xpos + xsize - 1, ypos + ysize -1)
      yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1
      isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId)

      // habrá colision si toca alguno de los 3 bloques
      isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3

      if (isColliding) {
        // existe colision a la derecha
        player.isCollidingWithObstacleOnTheLeft = true

        // AJUSTE: Calcular solapamiento y mover el personaje lo correspondiente
        overlap = Math.floor(xPos) % brickSize + 1
        player.xPos -= overlap - brickSize
      }
      break

    case State.DOWN:
      // primera colisión en (xPos, yPos + ySize - 1)
      yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;

      xPos = player.xPos + player.hitBox.xOffset;
      isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

      // segunda colisión en (xPos + brickSize, yPos + ySize - 1)
      xPos = player.xPos + brickSize - 3;
      isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

      // habrá colisión si toca alguno de los 3 bloques
      isColliding = isCollidingOnPos1 || isCollidingOnPos2;

      if (isColliding) {
        // existe colisión hacia abajo
        player.isCollidingWithObstacleOnTheBottom = true;

        // AJUSTE: Calcular solapamiento y mover el personaje lo correspondiente
        overlap = Math.floor(yPos) % brickSize + 1;
        player.yPos -= overlap;
      }
      break;

    case State.UP:
      // primera colisión en (xPos, yPos)
      yPos = player.yPos + player.hitBox.yOffset - 1;

      xPos = player.xPos + player.hitBox.xOffset;
      isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

      // segunda colisión en (xPos + brickSize, yPos)
      xPos = player.xPos + brickSize - 3;
      isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

      // habrá colisión si toca alguno de los 3 bloques
      isColliding = isCollidingOnPos1 || isCollidingOnPos2;

      if (isColliding) {
        // existe colisión hacia arriba
        player.isCollidingWithObstacleOnTheTop = true;

        // AJUSTE: Calcular solapamiento y mover el personaje lo correspondiente
        overlap = Math.floor(yPos) % brickSize + 1;
        player.yPos -= overlap - brickSize;
      }
      break;

    default:
      break;
  }
}
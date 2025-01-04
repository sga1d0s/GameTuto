import globals from "./globals.js"

export default function detectCollisions() {
  // calcular colision del player con cada uno de los sprites
  for (let i = 1; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i]
    detectCollisionBetweenPlayerAndSprite(sprite)
  }
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
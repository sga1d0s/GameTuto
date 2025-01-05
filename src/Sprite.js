// clase gestora de los sprites
export default class Sprite {
  constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox = { xOffset: 0, yOffset: 0, xSize: 0, ySize: 0 }) {
    this.id = id
    this.state = state
    this.xPos = xPos
    this.yPos = yPos
    this.imageSet = imageSet
    this.frames = frames
    this.physics = physics
    this.hitBox = hitBox
    this.isCollidingWithPlayer = false
    this.isCollidingWithObstacleOnTheTop = false
    this.isCollidingWithObstacleOnTheLeft = false
    this.isCollidingWithObstacleOnTheBottom = false
    this.isCollidingWithObstacleOnTheRight = false
  }
}

export class Pirate extends Sprite {
  constructor(id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection, hitBox) {
    // llamar al constructor de la clase Sprite
    super(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    
    this.directionChangeCounter = 0
    this.maxTimeToChangeDirection = maxTimeToChangeDirection
  }
}
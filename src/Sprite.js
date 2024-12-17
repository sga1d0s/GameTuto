// clase gestora de los sprites
export default class Sprite {
  constructor(id, state, xPos, yPos, imageSet, frames, physics) {
    this.id = id
    this.state = state
    this.xPos = xPos
    this.yPos = yPos
    this.imageSet = imageSet
    this.frames = frames
    this.physics = physics
  }
}

export class Pirate extends Sprite {
  constructor(id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection) {
    // llamar al constructor de la clase Sprite
    super(id, state, xPos, yPos, imageSet, frames, physics)
    
    this.directionChangeCounter = 0
    this.maxTimeToChangeDirection = maxTimeToChangeDirection
  }
}
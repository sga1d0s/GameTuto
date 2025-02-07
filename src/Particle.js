class Particle {
  constructor(id, state, xPos, yPos, radius, alpha, physics) {
    this.id = id,
      this.state = state,
      this.xPos = xPos,
      this.yPos = yPos,
      this.radius = radius,
      this.alpha = alpha,
      this.physics = physics
  }
}

export default class ExplosionParticle extends Particle {
  constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade) {
    super(id, state, xPos, yPos, radius, alpha, physics)
    this.timeToFade = timeToFade
    this.fadeCounter = 0
  }
}

export default class Physics {
  constructor(vLimit, aLimit){
    // velocidad actual en x
    this.vx = 0
    // velocidad actual en y
    this.vy = 0
    // velocidad máxima
    this.vLimit = vLimit
    // aceleración máxima
    this.aLimit = aLimit
  }
}
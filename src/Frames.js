// clase que define los frames
export default class Frames {
  constructor(framePerState){
    // numero de frames por estado de animación
    this.framePerState = framePerState
    // contador de frames
    this.frameCounter = 0
  }
}
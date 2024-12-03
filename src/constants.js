// constants

// estados del juego
export const Game = {
  INVALID: -1,
  LOADING: 0,
  PLAYING: 1,
  OVER: 2,
}

// velocidad del juevo
export const FPS = 30

// identificador de tipo de Sprite (ID)
export const SpriteID = {
  PLAYER: 0,
  PIRATE: 1,
  JOKER: 2,
  KNIGHT: 3,
}

// identificador de estado de sprite (dirección)
export const State = {
  // estados PLAYER
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3,

  // estados PIRATE
  LEFT_2: 0,
  RIGHT_2: 1,

  // estados JOKER, KNIGHT
  STILL: 0,
}
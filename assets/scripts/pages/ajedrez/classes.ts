export type ChessMovement = {
  direccion: string
  length: number
  action: string
}

export type Player = {
  name: string
  index: number
}

export type FunctionCallback = {
  key: string;
  callback: Function;
}

export type Movements = {
  moveToTop: number
  moveToBottom: number
  moveToLeft: number
  moveToRigth: number
}

export type Box = {
  x: number
  y: number
  name: string
  movement?: ChessMovement
}

export type Chessboard = {
  row: Array<Box>
} 

export class Game {
  topPlayerMovements: Array<Box>
  bottomPlayerMovements: Array<Box>
  topPlayerCatching: Array<Box>
  bottomPlayerCatching: Array<Box>
  currentPlayer: Player
  movements: Array<Box>
  boxes: Array<Chessboard>
  lastBox: Box
  table: HTMLElement
  
  constructor() {
    this.topPlayerMovements = []
    this.bottomPlayerMovements = []
    this.topPlayerCatching = []
    this.bottomPlayerCatching = []
    this.movements = []
    this.boxes = []
    this.currentPlayer = <Player>{}
    this.lastBox = <Box>{}
    this.table = <HTMLElement>{}
  }
}
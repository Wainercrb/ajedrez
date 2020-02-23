import Vue from 'vue'
import figuresJSON from 'static/figures.json'
import { getBoxes } from '~/assets/scripts/pages/ajedrez/moves.ts'
import { Game, Player, Box, Chessboard } from '~/assets/scripts/pages/ajedrez/classes'

const BOARD_LENGTH = 8
const COLORS: any = {
  onlyMove: 'blue',
  catch: 'red'
}
const PLAYERS = [
  { name: 'player-top', index: 0 },
  { name: 'player-bottom', index: 1 }
]

export default Vue.extend({
  name: 'page-ajedrez',
  data() {
    const game: Game = new Game()
    return { game }
  },
  mounted() {
    this.game.table = <HTMLElement>this.$refs['table']
    this.drawBoard()
    this.initPlayersBoxes()
    this.startGame()
  },
  methods: {
    startGame(): void {
      const random = Math.floor(Math.random() * PLAYERS.length)
      this.game.currentPlayer = PLAYERS[random]
    },
    drawBoard(): void {
      for (let x = 0; x < BOARD_LENGTH; x++) {
        const boxes: Array<Box> = []
        for (let y = 0; y < BOARD_LENGTH; y++) boxes.push({ x, y, name: '' })
        const chessboard: Chessboard = { row: boxes }
        this.game.boxes.push(chessboard)
      }
    },
    selectBox(box: Box): void {
      const hasFigure = boxHasFigure(box)
      const hasLastBox = boxIsEmpty(this.game.lastBox)
      if (!hasLastBox && !hasFigure) return
      if (!hasLastBox) this.drawMovements(box)
      else this.moveBox(box)
    },
    drawMovements(box: Box) {
      const canMove = matchPlayerWithBox(box, this.game.currentPlayer)
      if (!canMove) {
        this.resetBoard()
        return
      }
      this.game.movements = getBoxes(box, BOARD_LENGTH)
      this.game.lastBox = box
      printTable(this.game.table, this.game.movements)
    },
    moveBox(box: Box) {
      const canMove = this.game.movements.find((findBox) => validateBoxCordinates(findBox, box))
      if (!canMove) {
        this.resetBoard()
        return
      }
      findBox(this.game.boxes, this.game.lastBox, box)
      this.game.currentPlayer = nextTurn(this.game.currentPlayer)
      this.addingBoxToPlayer(box)
      this.resetBoard()
    },
    resetBoard() {
      clearTable(this.game.table, this.game.movements)
      this.game.lastBox = <Box>{}
      this.game.movements = []
    },
    pushBoxToPlayerTop(box: Box) {
      const boxIndex = this.game.topPlayerMovements.findIndex(findBox => validateBoxCordinates(findBox, this.game.lastBox))
      this.game.topPlayerMovements.push(box)
      if (boxIndex >= 0) {
        this.game.topPlayerMovements.splice(boxIndex, 1)
      }
    },
    pushBoxToPlayerBottom(box: Box) {
      const boxIndex = this.game.bottomPlayerMovements.findIndex(findBox => validateBoxCordinates(findBox, this.game.lastBox))
      this.game.bottomPlayerMovements.push(box)
      if (boxIndex >= 0) {
        this.game.bottomPlayerMovements.splice(boxIndex, 1)
      }
    },
    addingBoxToPlayer(box: Box) {
      if (this.game.currentPlayer.name === 'player-top') {
        this.pushBoxToPlayerTop(box)
      } else {
        this.pushBoxToPlayerBottom(box)
      }
    },
    initPlayersBoxes(): void {
      const { playerTop, playerBottom } = getInitialPlayersPosition()
      this.drawTopFigures(playerTop.x)
      this.drawBottomFigures(playerBottom.x)
    },
    drawTopFigures(x: number): void {
      for (let index = 0; index < BOARD_LENGTH; index++) {
        this.game.boxes[x].row[index].name = figuresJSON.secondRow[index].name + '-bottom'
        this.game.boxes[x + 1].row[index].name = figuresJSON.firstRow.name + '-bottom'
      }
    },
    drawBottomFigures(x: number): void {
      for (let index = 0; index < BOARD_LENGTH; index++) {
        this.game.boxes[x].row[index].name = figuresJSON.secondRow[index].name + '-top'
        this.game.boxes[x - 1].row[index].name = figuresJSON.firstRow.name + '-top'
      }
    }
  }
})

function clearTable(table: HTMLElement, boxes: Array<Box>) {
  boxes.forEach((box: Box) => {
    const tr = <HTMLElement>table.getElementsByClassName(`${box.x},${box.y}`)[0]
    if (tr) {
      tr.style.backgroundColor = ''
    }
  })
}

function printTable(table: HTMLElement, boxes: Array<Box>) {
  boxes.forEach((box: Box) => {
    const tr = <HTMLElement>table.getElementsByClassName(`${box.x},${box.y}`)[0]
    if (tr) {
      const action = <any>box.movement?.action
      tr.style.backgroundColor = COLORS[action]
    }
  })
}

// todo: make interface
function getInitialPlayersPosition() {
  const playerTop: Box = { x: 0, y: 0, name: '' } //always init in 0
  const playerBottom: Box = { x: BOARD_LENGTH - 1, y: 0, name: '' }
  return { playerTop, playerBottom }
}

function boxIsEmpty(box: Box) {
  if (Object.keys(box).length) {
    return true
  }
  return false
}

function boxHasFigure(box: Box) {
  if (!box.name.length) return false
  return true
}

function findBox(boxes: Array<Chessboard>, firstBox: Box, secondBox: Box ) {
  const flat = [].concat.apply([], boxes.map((item: any) => item.row))
  const box = <any>(flat.find((findBox: Box) => validateBoxCordinates(findBox, firstBox)))
  secondBox.name = box.name
  firstBox.name = ''
}

function matchPlayerWithBox(box: Box, player: Player) {
  const boxName = box.name.split('-')[1]
  const playerName = player.name.split('-')[1]
  return boxName === playerName
}

function validateBoxCordinates(firstBox: Box, secondBox: Box) {
  return firstBox.x === secondBox.x && firstBox.y === secondBox.y
}

function nextTurn(player: Player): Player {
  const index = player.index === 0 ? 1 : 0
  return PLAYERS[index]
}


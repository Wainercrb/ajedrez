import Vue from 'vue'
import figuresJSON from 'static/figures.json'

const boardLenth = 8

interface childBoxeInterface {
  x: number
  y: number
  name: string
}

interface parentBoxeInterface {
  boxes: childBoxeInterface[]
}

export default Vue.extend({
  name: 'page-ajedrez',
  data() {
    const boxes = Array<parentBoxeInterface>()
    const currentBox: childBoxeInterface = initChildBoxes()
    const boxesPlayerTop: Array<childBoxeInterface> = []
    const boxesPlayerBottom: Array<childBoxeInterface> = []
    return {
      boxes,
      currentBox,
      boxesPlayerTop,
      boxesPlayerBottom
    }
  },
  mounted() {
    this.initBoard()
    this.initMatch()
  },
  methods: {
    initBoard(): void {
      for (let x = 0; x < boardLenth; x++) {
        const childBoxes: Array<childBoxeInterface> = []
        for (let y = 0; y < boardLenth; y++) childBoxes.push({ x, y, name: '' })
        const parentBox: parentBoxeInterface = { boxes: childBoxes }
        this.boxes.push(parentBox)
      }
    },
    selectBox(childBox: childBoxeInterface): void {
      this.currentBox = childBox
    },
    initMatch(): void {
      const { playerTop, playerBottom } = getInitialPlayersPosition()
      this.drawTopFigures(playerTop.x)
      this.drawBottomFigures(playerBottom.x)

    },
    drawTopFigures(x: number) {
      for (let index = 0; index < boardLenth; index++) {
        this.boxes[x].boxes[index].name = figuresJSON.secondRow[index].name + '-top'
        this.boxes[x + 1].boxes[index].name = figuresJSON.firstRow.name + '-top'
      }
    },
    drawBottomFigures(x: number) {
      for (let index = 0; index < boardLenth; index++) {
        this.boxes[x].boxes[index].name = figuresJSON.secondRow[index].name + '-bottom'
        this.boxes[x - 1].boxes[index].name = figuresJSON.firstRow.name + '-bottom'
      }
    }
  }
})

function initChildBoxes(): childBoxeInterface {
  return {
    x: -1,
    y: -1,
    name: ''
  }
}

// todo: make interface
function getInitialPlayersPosition() {
  const playerTop: childBoxeInterface = { x: 0, y: 0, name: '' } //always init in 0
  const playerBottom: childBoxeInterface = { x: boardLenth - 1, y: 0, name: '' }
  return { playerTop, playerBottom }
}
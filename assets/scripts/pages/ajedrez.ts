import Vue from 'vue'
import figuresJSON from 'static/figures.json'
import moves from 'static/movements.json'

const boardLenth = 8

interface FN {
  key: string;
  callback: Function;
}

class ChildBoxeInterface {
  x: number
  y: number
  name: string
  constructor() {
    this.x = -1
    this.y = -1
    this.name = ''
  }
}

class ParentBoxeInterface {
  boxes: ChildBoxeInterface[]
  constructor() {
    this.boxes = []
  }
}

export default Vue.extend({
  name: 'page-ajedrez',
  data() {
    const boxes = Array<ParentBoxeInterface>()
    const currentBox: ChildBoxeInterface = new ChildBoxeInterface()
    const boxesPlayerTop: Array<ChildBoxeInterface> = []
    const boxesPlayerBottom: Array<ChildBoxeInterface> = []
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
        const childBoxes: Array<ChildBoxeInterface> = []
        for (let y = 0; y < boardLenth; y++) childBoxes.push({ x, y, name: '' })
        const parentBox: ParentBoxeInterface = { boxes: childBoxes }
        this.boxes.push(parentBox)
      }
    },
    selectBox(childBox: ChildBoxeInterface): void {

      // const table = <HTMLElement>this.$refs['table']
      // this.currentBox = childBox
      // const move = moves.find((move: any) => move.name = this.currentBox)
      // const movesFS = getMove()
      // console.log(move)
      // if (move) {
      //   const fbs = movesFS.filter(e => e.key === move.figureName)
      //   fbs.forEach((element: FN) => {
      //     const f: any = element.callback
      //     const fs = f(this.currentBox)
      //     console.log(fs)
      //     const tr = <HTMLElement>table.getElementsByClassName(`${fs.x},${fs.y}`)[0]
      //     if (tr) {
      //       tr.style.backgroundColor = 'red'

      //     }
      //   });
      // }

      const table = <HTMLElement>this.$refs['table']
      this.currentBox = childBox
      const move = moves.find((move: any) => move.name = this.currentBox)
      const movesFS = getMove()
      console.log(move)
      if (move) {
        const fbs = movesFS.filter(e => e.key === move.figureName)
        fbs.forEach((element: FN) => {
          const f: any = element.callback
          const fs = f(this.currentBox, this.boxes)
          console.log('fs asfas', fs)
          fs.forEach((element: any) => {
            const tr = <HTMLElement>table.getElementsByClassName(`${element.x},${element.y}`)[0]
            if (tr) {
              tr.style.backgroundColor = 'red'
            }
            });
        });
      }
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

// todo: make interface
function getInitialPlayersPosition() {
  const playerTop: ChildBoxeInterface = { x: 0, y: 0, name: '' } //always init in 0
  const playerBottom: ChildBoxeInterface = { x: boardLenth - 1, y: 0, name: '' }
  return { playerTop, playerBottom }
}

function getMove(): Array<FN> {
  return [
    // {
    //   key: 'pawn',
    //   callback: topOneToTop
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToBottom
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToRigth
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToLeft
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToTopLeft
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToTopRigth
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToBottomLeft
    // },
    // {
    //   key: 'pawn',
    //   callback: topOneToBottomRigth
    // }

    {
      key: 'pawn',
      callback: topAnyToTopRigth
    },

    {
      key: 'pawn',
      callback: topAnyToTopLeft
    },
    {
      key: 'pawn',
      callback: topAnyToBottomLeft
    },

    {
      key: 'pawn',
      callback: topAnyToBottomRigth
    }
  ]
}

function topOneToTop(box: ChildBoxeInterface) {
  return [{
    x: box.x - 1,
    y: box.y,
    name: box.name
  }]
}

function topOneToBottom(box: ChildBoxeInterface) {
  return [{
    x: box.x + 1,
    y: box.y,
    name: box.name
  }]
}

function topOneToRigth(box: ChildBoxeInterface) {
  return [{
    x: box.x,
    y: box.y + 1,
    name: box.name
  }]
}

function topOneToLeft(box: ChildBoxeInterface) {
  return [{
    x: box.x,
    y: box.y - 1,
    name: box.name
  }]
}


//top rigth

function topOneToTopRigth(box: ChildBoxeInterface) {
  return [{
    x: box.x - 1,
    y: box.y + 1,
    name: box.name
  }]
}

function topOneToTopLeft(box: ChildBoxeInterface) {
  return [{
    x: box.x - 1,
    y: box.y - 1,
    name: box.name
  }]
}

function topOneToBottomRigth(box: ChildBoxeInterface) {
  return [{
    x: box.x + 1,
    y: box.y + 1,
    name: box.name
  }]
}

function topOneToBottomLeft(box: ChildBoxeInterface) {
  return [{
    x: box.x + 1,
    y: box.y - 1,
    name: box.name
  }]
}

// n

function topAnyToTopLeft(box: ChildBoxeInterface) {
  const result: Array<ChildBoxeInterface> = []
  for (let index = 0; index < box.y; index++) {
    const boxRefactor = topOneToTopLeft({
      x: box.x - index,
      y: box.y - index,
      name:  box.name
    })
    if (boxRefactor.length) {
      result.push(boxRefactor[0])
    }
  }
  return result
}


function topAnyToBottomRigth(box: ChildBoxeInterface) {
  const result: Array<ChildBoxeInterface> = []
  const length = (boardLenth - 1) - box.y
  for (let index = 0; index < length; index++) {
    const boxRefactor = topOneToBottomRigth({
      x: box.x + index,
      y: box.y + index,
      name:  box.name
    })
    if (boxRefactor.length) {
      result.push(boxRefactor[0])
    }
  }
  return result
}

function topAnyToTopRigth(box: ChildBoxeInterface) {
  const result: Array<ChildBoxeInterface> = []
  const length = (boardLenth - 1) - box.y
  for (let index = 0; index < length; index++) {
    const boxRefactor = topOneToTopRigth({
      x: box.x - index,
      y: box.y + index,
      name:  box.name
    })
    if (boxRefactor.length) {
      result.push(boxRefactor[0])
    }
  }
  return result
}


function topAnyToBottomLeft(box: ChildBoxeInterface) {
  const result: Array<ChildBoxeInterface> = []
  for (let index = 0; index < box.y; index++) {
    const boxRefactor = topOneToBottomLeft({
      x: box.x + index,
      y: box.y - index,
      name:  box.name
    })
    if (boxRefactor.length) {
      result.push(boxRefactor[0])
    }
  }
  return result
}





function findIndParentBoxeInterface(array: ChildBoxeInterface[], box: ChildBoxeInterface) {
  return array.find((sub: ChildBoxeInterface) => {
    return sub.x === box.x && sub.y === box.x
  })
}
import { Box, Movements, ChessMovement } from '~/assets/scripts/pages/ajedrez/classes'
import moves from '~/static/moves.json'

const MOVES = [
  {
    key: 'moveToTop',
    callback: moveToTop,
  },
  {
    key: 'moveToBottom',
    callback: moveToBottom,
  },
  {
    key: 'moveToRigth',
    callback: moveToRigth,
  },
  {
    key: 'moveToLeft',
    callback: moveToLeft,
  },
  {
    key: 'moveToTopLeft',
    callback: moveToTopLeft,
  },
  {
    key: 'moveToTopRigth',
    callback: moveToTopRigth,
  },
  {
    key: 'moveToBottomLeft',
    callback: moveToBottomLeft,
  },
  {
    key: 'moveToBottomRigth',
    callback: moveToBottomRigth,
  }
]

function moveToTop(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x - index,
      y: box.y,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToBottom(box: Box, movement: ChessMovement, length: number = 1) {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x + index,
      y: box.y,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToRigth(box: Box, movement: ChessMovement, length: number = 1) {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x,
      y: box.y + index,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToLeft(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x,
      y: box.y - index,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToTopRigth(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x - index,
      y: box.y + index,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToTopLeft(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x - index,
      y: box.y - index,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToBottomRigth(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x + index,
      y: box.y + index,
      name: box.name,
      movement
    })
  }
  return result
}

function moveToBottomLeft(box: Box, movement: ChessMovement, length: number = 1): Array<Box> {
  const result: Array<Box> = []
  for (let index = 1; index < length + 1; index++) {
    result.push({
      x: box.x + index,
      y: box.y - index,
      name: box.name,
      movement
    })
  }
  return result
}

function getMoves(box: Box, boardLenth: number): Movements {
  return {
    moveToTop: box.x,
    moveToBottom: boardLenth - box.x - 1,
    moveToLeft: box.y,
    moveToRigth: boardLenth - box.y - 1
  }
}

export function getBoxes(box: Box, boardLenth: number) {
  let result: Array<Box> = []
  const figure = moves.find(move => move.figureName === box.name)
  const defaltMoves = <any>getMoves(box, boardLenth)
  figure?.movement.forEach(movement => {
    const moveTo = defaltMoves[movement.direccion]
    const callbackFn = MOVES.find(callbackMove => movement.direccion === callbackMove.key)
    if (callbackFn) {
      const movesLength = movement.length !== -1 ? movement.length : moveTo
      const fn = callbackFn.callback(box, movement, movesLength)
      result = [...result, ...fn]
    }
  });
  return result
}


import { BOARD_SIZE } from "../data/consts";
import { Cell, type Board, type IElementData } from "../types";

export const isCanContinueGame = (board: Board, elements: IElementData[]) => {

  const getIsElementCanDrop = (x: number, y: number, element: IElementData) => {
    for (let i = 0; i < element.cell.length; i++) {
      const row = element.cell[i]
      for (let j = 0; j < row.length; j++) {
        const elementCell = row[j]
        const boardCell = board?.[y + i]?.[x + j]

        if (boardCell === undefined) return false
        if (boardCell === Cell.FILL && elementCell === Cell.FILL) {
          return false
        }
      }
    }

    return true
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const isCanFirstElementCanDrop = getIsElementCanDrop(i, j, elements[0])
      if (isCanFirstElementCanDrop) return true

      const isCanSecondElementCanDrop = getIsElementCanDrop(i, j, elements[1])
      if (isCanSecondElementCanDrop) return true

      const isCanThirdElementCanDrop = getIsElementCanDrop(i, j, elements[2])
      if (isCanThirdElementCanDrop) return true
    }
  }

  return false
}
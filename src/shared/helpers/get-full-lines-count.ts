import { BOARD_SIZE } from "../data/consts";
import { Cell, type Board } from "../types";

export const getFullCountsLines = (board: Board) => {
  let count = 0

  const isRemovableCell = (cell: Cell) => {
    return [Cell.REMOVE, Cell.HOVER_REMOVE].includes(cell)
  }

  const isFullHorizontalLine = (i: number) => {
    return board[i].every(isRemovableCell)
  }

  const isFullVerticalLine = (j: number) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (!isRemovableCell(board[i][j])) {
        return false
      }
    }
    return true
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    if (isFullHorizontalLine(i)) {
      count++
    }

    if (isFullVerticalLine(i)) {
      count++
    }
  }

  return count

}
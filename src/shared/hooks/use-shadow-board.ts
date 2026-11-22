import { useAppContext } from "../../providers/app-provider";
import { BOARD_SIZE } from "../data/consts";
import { type Board } from "../types";
import { Cell } from './../types';

export const useShadowBoard = () => {
  const { board, selectedElement } = useAppContext()

  const getIsElementCanDrop = (x: number, y: number) => {
    if (selectedElement === null) return false

    for (let i = 0; i < selectedElement.cell.length; i++) {
      const row = selectedElement.cell[i]
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

  const addHoveredCells = (newShadowBoard: Board, xx: number, yy: number): void => {
    if (selectedElement === null) return

    for (let i = 0; i < selectedElement.cell.length; i++) {
      const row = selectedElement.cell[i]
      for (let j = 0; j < row.length; j++) {
        const elementCell = row[j]
        const boardCell = newShadowBoard?.[yy + i]?.[xx + j]

        if (elementCell === Cell.FILL && boardCell !== undefined) {
          newShadowBoard[yy + i][xx + j] = Cell.HOVER
        }
      }
    }
  }

  const addRemovedCells = (newBoard: Board) => {
    const copy = structuredClone(newBoard)

    const changeHorizontalLine = (i: number) => {
      const changedLine = []

      for (let j = 0; j < BOARD_SIZE; j++) {
        const cell = copy[i][j]

        if (cell === Cell.NULL) return
        if (cell === Cell.HOVER) changedLine.push(Cell.HOVER_REMOVE)
        else changedLine.push(Cell.REMOVE)
      }
      newBoard[i] = changedLine
    }

    const changeVerticalLine = (i: number, j: number) => {
      if (i === BOARD_SIZE) {
        return true
      }
      const cell = copy[i][j]
      if (cell === Cell.NULL) return false

      if (changeVerticalLine(i + 1, j)) {

        if (cell === Cell.HOVER) {
          newBoard[i][j] = Cell.HOVER_REMOVE
        } else {
          newBoard[i][j] = Cell.REMOVE
        }
        return true
      }
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
      changeHorizontalLine(i)
      changeVerticalLine(0, i)
    }
  }

  return { getIsElementCanDrop, addHoveredCells, addRemovedCells }
}
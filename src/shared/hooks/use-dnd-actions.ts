import type { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/react";
import { useAppContext } from "../../providers/app-provider";
import { BOARD_SIZE, EMPTY_BOARD } from "../data/consts";
import { generateElement } from "../helpers/generate-element";
import { isCanContinueGame } from '../helpers/is-can-continue-game';
import { Cell, type IElementData } from "../types";
import { useScore } from './use-score';
import { useShadowBoard } from "./use-shadow-board";

export const useDndActions = () => {
  const {
    x,
    y,
    board,
    selectedElement,
    shadowBoard,
    elements,

    setX,
    setY,
    setBoard,
    setElements,
    setShadowBoard,
    setDroppedElement,
    setSelectedElement,
    setIsGameOver,
  } = useAppContext()

  const { getIsElementCanDrop, addHoveredCells, addRemovedCells } = useShadowBoard()
  const { changeScoreData } = useScore()

  const onDragStart = (event: DragStartEvent) => {
    const { source } = event.operation;
    setSelectedElement(source?.data as IElementData)
  }

  const onDragMove = (event: DragMoveEvent) => {
    const { source, target } = event.operation;
    const sourceElement = source?.element
    const targetElement = target?.element

    if (target?.id !== 'board') return
    if (!sourceElement || !targetElement) return
    if (!selectedElement) return

    const s = sourceElement.getBoundingClientRect()
    const t = targetElement.getBoundingClientRect()

    const cellSize = t.width / BOARD_SIZE
    const delta = cellSize / 2

    const clear = () => {
      setX(null);
      setY(null)
      setShadowBoard(EMPTY_BOARD)
    }

    if (s.left < t.left - delta) return clear()
    if (s.top < t.top - delta) return clear()

    if (s.right > t.right + delta) return clear()
    if (s.bottom > t.bottom + delta) return clear()

    const xx = Math.round(Math.abs(s.x - t.x) / cellSize)
    const yy = Math.round(Math.abs(s.y - t.y) / cellSize)
    const isCoordinatesChanged = xx !== x || yy !== y

    if (!isCoordinatesChanged) return
    if (!getIsElementCanDrop(xx, yy)) return clear()

    setX(xx)
    setY(yy)
    setShadowBoard(() => {
      const copy = structuredClone(board)
      addHoveredCells(copy, xx, yy)
      addRemovedCells(copy)
      return copy
    })
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { source, target } = event.operation;

    if (event.canceled) return;
    if (target?.id !== 'board') return
    if (x === null || y === null || selectedElement === null) return

    setDroppedElement(source?.data as IElementData)
    setElements(prev => {
      const changedElements = prev.map(el => el?.id === source?.data?.id ? generateElement() : el)
      localStorage.setItem('elements', JSON.stringify(changedElements))
      return changedElements
    })
    changeScoreData(shadowBoard)

    setTimeout(() => {
      setBoard(prev => {
        const copy = structuredClone(prev)
        if (selectedElement == null || x == null || y == null) return prev

        for (let i = 0; i < BOARD_SIZE; i++) {
          for (let j = 0; j < BOARD_SIZE; j++) {
            switch (shadowBoard[i][j]) {
              case Cell.HOVER: {
                copy[i][j] = Cell.FILL
                break
              }
              case Cell.REMOVE:
              case Cell.HOVER_REMOVE: {
                copy[i][j] = Cell.NULL
              }
            }
          }
        }
        localStorage.setItem('board', JSON.stringify(copy))

        if (!isCanContinueGame(copy, elements)) {
          setIsGameOver(true)
        }

        return copy
      })

      setX(null)
      setY(null)
      setShadowBoard(EMPTY_BOARD)
      setSelectedElement(null)
      setDroppedElement(null)
      source?.destroy()
    }, 50);
  }

  return {
    onDragStart,
    onDragMove,
    onDragEnd
  }
}
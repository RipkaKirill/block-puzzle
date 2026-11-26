import { createContext, useContext, useState, type FC, type ReactNode } from "react"
import { DEFAULT_SCORE_DATA, EMPTY_BOARD } from "../shared/data/consts"
import type { Cell, ElementsState, IAppContext, IElementData, IScoreData } from "../shared/types"
import { generateElement } from "../shared/helpers/generate-element"
import { isCanContinueGame } from "../shared/helpers/is-can-continue-game"

export const AppContext = createContext<IAppContext | null>(null)

const boardFromStorage = localStorage.getItem('board')
const elementsFromStorage = localStorage.getItem('elements')
const scoreFromStorage = localStorage.getItem('score')

const getDefaultBoard = () => {
  if (boardFromStorage !== null) {
    return JSON.parse(boardFromStorage)
  }
  return EMPTY_BOARD
}
const getDefaultElements = () => {
  if (elementsFromStorage !== null) {
    return JSON.parse(elementsFromStorage)
  }
  return [generateElement(), generateElement(), generateElement()]
}

const getDefaultScoreData = () => {
  if (scoreFromStorage !== null) {
    return JSON.parse(scoreFromStorage)
  }
  return DEFAULT_SCORE_DATA
}

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<Cell[][]>(getDefaultBoard())
  const [shadowBoard, setShadowBoard] = useState<Cell[][]>(EMPTY_BOARD)
  const [elements, setElements] = useState<ElementsState>(getDefaultElements())
  const [selectedElement, setSelectedElement] = useState<IElementData | null>(null)
  const [droppedElement, setDroppedElement] = useState<IElementData | null>(null)
  const [scoreData, setScoreData] = useState<IScoreData>(getDefaultScoreData())
  const [isGameOver, setIsGameOver] = useState<boolean>(!isCanContinueGame(getDefaultBoard(), getDefaultElements()))

  const [x, setX] = useState<number | null>(null)
  const [y, setY] = useState<number | null>(null)

  return (
    <AppContext.Provider value={{
      x, setX,
      y, setY,
      board, setBoard,
      shadowBoard, setShadowBoard,
      elements, setElements,
      droppedElement, setDroppedElement,
      selectedElement, setSelectedElement,
      scoreData, setScoreData,
      isGameOver, setIsGameOver
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const data = useContext(AppContext)

  if (data === null) return {} as IAppContext
  return data
}


import type { Dispatch, SetStateAction } from "react"

export interface IAppContext {
  x: Coordinate,
  setX: Dispatch<SetStateAction<Coordinate>>

  y: Coordinate,
  setY: Dispatch<SetStateAction<Coordinate>>

  board: Board,
  setBoard: Dispatch<SetStateAction<Board>>,

  shadowBoard: Board,
  setShadowBoard: Dispatch<SetStateAction<Board>>,

  elements: ElementsState,
  setElements: Dispatch<SetStateAction<ElementsState>>,

  droppedElement: IElementData | null,
  setDroppedElement: Dispatch<SetStateAction<IElementData | null>>,

  selectedElement: IElementData | null,
  setSelectedElement: Dispatch<SetStateAction<IElementData | null>>,
}

// export type Cell = CellState
export type Board = Cell[][]
export type CellMatrix = Cell[][]
export type Coordinate = number | null

export type ElementsState = (IElementData | null)[]

export interface IElementData {
  id: string
  cell: CellMatrix
}

export enum Cell {
  NULL = 0,
  FILL = 1,
  REMOVE = 2,
  HOVER = 3,
  HOVER_REMOVE = 4,
}
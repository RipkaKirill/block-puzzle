import { elements } from "../data/elements";
import { Cell, type CellMatrix, type IElementData } from "../types";
import { getRandomNumber } from "./get-random-number";
import { getUuid } from "./get-uuid";

const rotateRight = (matrix: CellMatrix): CellMatrix => {
  const m = matrix[0].length
  const n = matrix.length
  const result = Array.from({ length: m }, () => Array(n).fill(Cell.NULL));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result[j][result[0].length - 1 - i] = matrix[i][j]
    }
  }

  return result as CellMatrix
};

const rotateLeft = (matrix: CellMatrix): CellMatrix => {
  const m = matrix[0].length
  const n = matrix.length
  const result = Array.from({ length: m }, () => Array(n).fill(Cell.NULL));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result[result.length - 1 - j][i] = matrix[i][j]
    }
  }

  return result as CellMatrix
}

const rotate180 = (matrix: CellMatrix): CellMatrix => {
  const m = matrix.length
  const n = matrix[0].length
  const result = Array.from({ length: m }, () => Array(n).fill(Cell.NULL));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result[result.length - 1 - i][result[0].length - 1 - j] = matrix[i][j]
    }
  }

  return result as CellMatrix
}


const rotateElement = (element: CellMatrix, count: number) => {
  switch (count) {
    case 1: return rotateRight(element)
    case 2: return rotate180(element)
    case 3: return rotateLeft(element)
    default: return element
  }
}

export const generateElement = (): IElementData => {
  const randomNumber = getRandomNumber(0, 12);
  const randomRotation = getRandomNumber(0, 3);

  const element = elements?.[randomNumber]

  return {
    id: getUuid(),
    cell: rotateElement(element, randomRotation)
  }
}
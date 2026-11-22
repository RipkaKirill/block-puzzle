import { Cell, type Board } from "../types";

export const BOARD_SIZE = 10
export const EMPTY_BOARD: Board = Array.from(
  { length: BOARD_SIZE },
  () => Array(BOARD_SIZE).fill(Cell.NULL)
);
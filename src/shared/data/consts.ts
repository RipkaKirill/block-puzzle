import { Cell, type Board, type IScoreData } from "../types";

export const BOARD_SIZE = 8
export const EMPTY_BOARD: Board = Array.from(
  { length: BOARD_SIZE },
  () => Array(BOARD_SIZE).fill(Cell.NULL)
);
export const DEFAULT_SCORE_DATA: IScoreData = {
  value: 0,
  combo: 0,
  moveCounter: 0
}
import { useAppContext } from "../../providers/app-provider"
import { BOARD_SIZE } from "../data/consts"
import { getFullCountsLines } from "../helpers/get-full-lines-count"
import { Cell, type Board } from "../types"

export const useScore = () => {
  const { scoreData, selectedElement, setScoreData } = useAppContext()

  const changeScoreData = (board: Board) => {
    if (!selectedElement) return

    setScoreData(prev => {
      const newScoreData = { ...prev }

      const removeLinesCount = getFullCountsLines(board)

      if (removeLinesCount > 0) {
        newScoreData.moveCounter = 0
        newScoreData.combo = Math.min(newScoreData.combo + 1, 9)
      } else {
        newScoreData.moveCounter += 1
        newScoreData.combo = newScoreData.moveCounter > 2 ? 0 : newScoreData.combo
      }

      const scoreFromElement = selectedElement.cell.flat().filter(cell => cell === Cell.FILL).length
      const scoreFromLines = BOARD_SIZE * removeLinesCount * (removeLinesCount + 1) / 2
      const comboMultiplier = Math.min(1 + newScoreData.combo * 0.25, 2)

      newScoreData.value += scoreFromElement + Math.floor(scoreFromLines * comboMultiplier)

      localStorage.setItem('score', JSON.stringify(newScoreData))
      return newScoreData
    })
  }

  return {
    score: scoreData.value,
    combo: scoreData.combo,
    changeScoreData
  }
}
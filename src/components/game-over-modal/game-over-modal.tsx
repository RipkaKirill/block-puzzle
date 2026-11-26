import { createPortal } from 'react-dom';
import { useAppContext } from '../../providers/app-provider';
import styles from './game-over-modal.module.css';
import { useScore } from '../../shared/hooks/use-score';
import { DEFAULT_SCORE_DATA, EMPTY_BOARD } from '../../shared/data/consts';
import { generateElement } from '../../shared/helpers/generate-element';

const GameOverModal = () => {
  const { isGameOver, setIsGameOver, setBoard, setElements, setScoreData } = useAppContext()
  const { score } = useScore()

  const handleRetry = () => {
    setIsGameOver(false)
    localStorage.removeItem('board')
    localStorage.removeItem('elements')
    localStorage.removeItem('score')
    setBoard(EMPTY_BOARD)
    setElements([generateElement(), generateElement(), generateElement()])
    setScoreData(DEFAULT_SCORE_DATA)
  }
  if (!isGameOver) return <></>

  return (
    createPortal(<div className={styles.layout}>
      <div className={styles.body}>
        <div className={styles.score}>
          {score}
        </div>

        <div
          onClick={handleRetry}
          className={styles.button}>Try again</div>
      </div>
    </div>, document.body)
  );
}

export default GameOverModal
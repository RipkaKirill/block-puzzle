import type { FC } from 'react';
import { useScore } from '../../shared/hooks/use-score';
import styles from './score.module.css';


const Score: FC = () => {
  const { score, combo } = useScore()
  return (
    <div className={styles.container}>
      <div className={styles.score}>{score}</div>

      {combo > 0 && (
        <div className={styles.combo}>x{combo + 1}</div>
      )}

    </div>
  );
}

export default Score
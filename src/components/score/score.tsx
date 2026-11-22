import type { FC } from 'react';
import styles from './score.module.css';

interface IProps {
  value: number
}

const Score: FC<IProps> = ({ value }) => {
  return (
    <>
      <div className={styles.score}>{value}</div>
    </>
  );
}

export default Score
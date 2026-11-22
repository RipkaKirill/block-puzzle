import { useAppContext } from '../../providers/app-provider';
import type { IElementData } from '../../shared/types';
import Element from '../element/element';
import styles from './elements.module.css';

const Elements = () => {
  const { elements } = useAppContext()

  return (
    <>
      <div className={styles.elements}>
        {elements.map((data: IElementData | null) => (
          <div key={data?.id || crypto.randomUUID()} className={styles.container}>
            {!!data && <Element {...data} />}
          </div>
        ))}
      </div>
    </>
  );
}

export default Elements
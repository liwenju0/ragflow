import { useTranslate } from '@/hooks/common-hooks';
import { Rate } from 'antd';
import styles from './index.less';

const LoginRightPanel = () => {
  const { t } = useTranslate('login');

  return (
    <div className={styles.rightPanel}>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>

      <div className={styles.reviewSection}>
        <Rate disabled defaultValue={5} />
        <p>5.0</p>
        <span>{t('review')}</span>
      </div>
    </div>
  );
};

export default LoginRightPanel;

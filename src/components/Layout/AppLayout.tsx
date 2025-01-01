import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: LayoutProps) => {
  return <article className={styles.app}>{children}</article>;
};

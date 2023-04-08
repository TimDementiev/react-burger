import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './header.module.css';
import AppHeader from '../../components/app-header/app-header';

const Header: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
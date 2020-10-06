import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../style/Sidebar.module.css";

const SidebarTop = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/roar-b54b1.appspot.com/o/logo%2Froar%E3%83%AD%E3%82%B3%E3%82%99.png?alt=media&token=592910ac-6be1-48fd-8454-dc40828de9bb"
            className={styles.logo}
          />
        </Link>
      </div>
      <ul className={styles.sidebarFixed}>
        <li className={styles.sidebarItem}>
          <Link to="/TeamSearch" className={styles.link}>
            チームを探す
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarTop;

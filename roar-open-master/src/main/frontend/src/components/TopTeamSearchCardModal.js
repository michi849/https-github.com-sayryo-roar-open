import React from "react";
import styles from "../style/TopTeamSearchCardModal.module.css";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const TopTeamSearchCardModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ログインして、チームに参加してみよう！</div>
      <div className={styles.homeButton}>
        <Link to="/">
          <Button variant="contained" color="primary">
            さっそくログインする
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopTeamSearchCardModal;

import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "../style/TeamEditComplete.module.css";

const TeamEditComplete = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>チーム情報が変更されました！</div>
      <Button>
        <Link to="/home"> ホームへ戻る</Link>
      </Button>
    </div>
  );
};

export default TeamEditComplete;

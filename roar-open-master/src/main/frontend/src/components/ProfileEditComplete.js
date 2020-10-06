import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "../style/ProfileEditComplete.module.css";

const ProfileEditComplete = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>プロフィールが変更されました !</div>
      <Button>
        <Link to="/home">
          <p>ホームへ戻る</p>
        </Link>
      </Button>
    </div>
  );
};

export default ProfileEditComplete;

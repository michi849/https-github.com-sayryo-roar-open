import React, { useState, useEffect } from "react";
import styles from "../style/Message.module.css";
import { auth, db } from "../firebase/index";

const Message = (props) => {
  const [name, setName] = useState("");
  const currentUid = auth.currentUser.uid;

  //ユーザー名を表示する処理
  useEffect(() => {
    if (props.uid !== currentUid) {
      //message取得
      const unsubscribe = db
        .collection("users")
        .doc(props.uid)
        .onSnapshot(
          function (doc) {
            setName(doc.data().name);
          },
          function (error) {
            alert("ユーザー名取得エラー：" + error);
          }
        );
      //コンポーネント破棄時onSnapshot解除
      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (props.uid === currentUid) {
    return (
      //現在ログインしているユーザーが送信したメッセージの描画
      <div className={`${styles.messageRight} ${styles.MessageContainer}`}>
        <div className={styles.message}>
          <div className={`${styles.textRight} ${styles.messageText}`}>
            {props.text}
          </div>
          <img className={styles.avatar} src={props.avatar} />
        </div>
        <p className={`${styles.dateRight} ${styles.date}`}>
          {props.dateString}
        </p>
      </div>
    );
  } else {
    return (
      //現在ログインしているユーザー以外が送信したメッセージの描画
      <div className={`${styles.messageLeft} ${styles.MessageContainer}`}>
        <p className={styles.name}>{name}</p>
        <div className={styles.message}>
          <img className={styles.avatar} src={props.avatar} />
          <div className={`${styles.textLeft} ${styles.messageText}`}>
            {props.text}
          </div>
        </div>
        <p className={`${styles.dateLeft} ${styles.date}`}>
          {props.dateString}
        </p>
      </div>
    );
  }
};

export default Message;

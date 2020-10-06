import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem as Item } from "react-chat-elements";
import { db, auth } from "../firebase/index";

const ChatItem = (props) => {
  const [unread, setUnread] = useState(0), //未読数
    [subtitle, setSubtitle] = useState(""), //最新メッセージ
    [dateString, setDateString] = useState(""); //最新メッセージ時刻

  useEffect(() => {
    if (props.teamId !== null) {
      //message取得
      const unsubscribe = db
        .collection("chat")
        .doc("teamId" + props.teamId)
        .onSnapshot(
          function (doc) {
            getExitTime(doc.data().message);
          },
          function (error) {
            alert("message取得エラー：" + error);
          }
        );

      //コンポーネント破棄時onSnapshot解除
      return () => {
        unsubscribe();
        unsubscribe2();
      };
    }
  }, []);

  //退出時間の取得と未読管理
  function unsubscribe2() {} //onSnapshot解除用
  const getExitTime = (message) => {
    unsubscribe2 = db
      .collection("chatExitTime")
      .doc(props.teamId + "_" + auth.currentUser.uid)
      .onSnapshot(
        function (doc) {
          let count = 0; //未読数をカウント
          let exitTime = doc.data().exitTime;
          let i = 0; //find関数の回転数記録
          //messageのタイムを取得
          message.find((m) => {
            i++;
            //時間(文字列)を数字のみへ変換
            let chatTime =
              m.dateString.slice(0, 4) +
              m.dateString.slice(5, 7) +
              m.dateString.slice(8, 10) +
              m.dateString.slice(11, 13) +
              m.dateString.slice(14, 16) +
              m.dateString.slice(17, 19);
            let exit =
              exitTime.slice(0, 4) +
              exitTime.slice(5, 7) +
              exitTime.slice(8, 10) +
              exitTime.slice(11, 13) +
              exitTime.slice(14, 16) +
              exitTime.slice(17, 19);
            //チャットと退出時間の比較
            if (chatTime > exit) {
              count++;
            }
            if (i === message.length) {
              setUnread(count);
              setSubtitle(m.text);
              if (m.dateString !== null) {
                setDateString(m.dateString);
              }
            }
          });
        },
        function (error) {
          alert("退出時間取得エラー：" + error);
        }
      );
  };

  if (dateString.length > 0) {
    return (
      <div>
        <Item
          avatar={props.picture} //アイコン
          alt={props.alt}
          title={props.teamName} //チーム名
          subtitle={subtitle} //最新コメント
          dateString={dateString.slice(0, 16)} //最新コメントの時刻
          unread={unread} //未読数
          onClick={() => props.handleShow(props.teamId, props.teamName)} //チャット内容表示
        />
      </div>
    );
  } else {
    return (
      <div>
        <Item
          avatar={props.picture} //アイコン
          alt={props.alt}
          title={props.teamName} //チーム名
          subtitle={subtitle} //最新コメント
          date={""} //最新コメントの時刻
          unread={unread} //未読数
          onClick={() => props.handleShow(props.teamId, props.teamName)} //チャット内容表示
        />
      </div>
    );
  }
};
export default ChatItem;

import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { auth, db } from "../firebase/index";

import styles from "../style/Chat.module.css";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import Message from "../components/Message";

import ChatItem from "../components/ChatItem";

import axios from "axios";

let keep_id = ""; //コンポーネント破棄時にid格納

const Chat = () => {
  const [loading, isLoading] = useState(false), //描画を管理する
    [show, isShow] = useState(false),
    [messageData, setMessageData] = useState([]),
    [id, setId] = useState(""),
    [teamList, setTeamList] = useState([]),
    [icon, setIcon] = useState("");

  let i = 0;
  let teamInfoList = []; //concat用の変数
  let messageList = []; //Cloud fireStoreの内容を代入するための変数

  // 1桁の数字を0埋めで2桁にする
  let toDoubleDigits = function (num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;
  };

  //現在時刻取得
  const date = new Date();
  const customDate =
    toDoubleDigits(date.getFullYear()) +
    "年" +
    toDoubleDigits(date.getMonth() + 1) +
    "月" +
    toDoubleDigits(date.getDate()) +
    "日" +
    toDoubleDigits(date.getHours()) +
    ":" +
    toDoubleDigits(date.getMinutes()) +
    ":" +
    toDoubleDigits(date.getSeconds());

  //関数の定義
  const messageAreaScroll = () => {
    const messageArea = document.getElementById("messageArea");
    messageArea.scrollTop = messageArea.scrollHeight;
  };

  const UsersTeamsInfo = async () => {
    const fn = async () => {
      // チームリスト情報受信API
      await axios
        .get(
          "http://localhost:8080/api/usersTeams" + "/" + auth.currentUser.uid
        )
        .then((res) => {
          //各チーム情報取得API
          for (i = 0; i < res.data.length; i++) {
            SearchInfo(res.data[i].teamId);
          }
        })
        .catch((error) => {
          alert("チームリスト情報取得エラー：" + error);
        });
    };
    fn();
  };

  const SearchInfo = async (id) => {
    await axios
      .get("http://localhost:8080/api/search", {
        params: {
          teamId: id,
          sportName: "",
          prefectures: "",
          activityFrequency: "",
          dayOfTheWeek: "",
          freeWord: "",
        },
      })
      .then((resSearch) => {
        teamInfoList = teamInfoList.concat(resSearch.data);
        if (i == teamInfoList.length) {
          setTeamList(teamInfoList);
        }
      })
      .catch((error) => {
        alert("各チーム情報取得エラー：" + error);
      });
  };

  const getImage = async () => {
    //送信
    await axios
      .get("http://localhost:8080/api/profile" + "/" + auth.currentUser.uid) //パスパラメータにユーザーIDを追加
      .then((res) => {
        setIcon(res.data.icon);
      })
      .catch((error) => {
        alert("アイコン取得エラー" + error);
      });
  };

  useEffect(() => {
    //初回API処理待ち
    const f = async () => {
      await UsersTeamsInfo();
      await getImage();
      isLoading(true);
    };
    f();

    //コンポーネント破棄時
    return () => {
      //onSnapshot解除
      unsubscribe();
      //退出時間を更新
      if (keep_id !== "") {
        updateExitTime(keep_id, customDate);
      }
    };
  }, []);

  //退出時間更新
  const updateExitTime = async (teamId, date) => {
    db.collection("chatExitTime")
      .doc(teamId + "_" + auth.currentUser.uid)
      .update({ exitTime: date })
      .then(function () {})
      .catch(function (error) {
        console.log("チャット未参加 or 退出時間更新エラー：" + error);
      });
  };
  //チャット内容表示
  function unsubscribe() {} //onSnapshot解除用
  const showChat = async (teamId) => {
    unsubscribe = db
      .collection("chat")
      .doc("teamId" + teamId)
      .onSnapshot(
        function (doc) {
          setMessageData(doc.data().message);
        },
        function (error) {
          alert("チャット内容表示エラー" + error);
        }
      );
  };
  //チーム選択時
  const handleShow = async (teamId, name) => {
    if (id !== "") {
      updateExitTime(id, customDate);
    }
    await updateExitTime(teamId, "9999年12月12日12:12:12");
    await showChat(teamId, name);
    setId(teamId);
    isShow(true);
    keep_id = teamId;
  };

  //送信・追加
  const addMessage = () => {
    // ユーザーが入力したテキストを取得
    const messageValue = document.getElementById("messageValue").value;
    // ユーザーが送信する新しいメッセージ情報
    const newMessage = [
      {
        avatar: icon,
        uid: auth.currentUser.uid, //メッセージを右に配置
        // position: uid === userUid ならright　 uid !== userUid　ならleft
        type: "text",
        text: messageValue, //ユーザーが入力したテキスト
        dateString: customDate, // 2020/8/20/13:34のように表示される。
      },
    ];
    // 新しいメッセージをCloud Fire storeのメッセージ配列に追加する
    messageList = messageData.concat(newMessage);
    db.collection("chat")
      .doc("teamId" + id)
      .set({ message: messageList });
    setMessageData(messageList);

    //textareaの値をクリアする
    document.getElementById("messageValue").value = "";
    messageAreaScroll();
  };

  if (loading === false) {
    //読み込み中
    return <></>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.navBar}>チャット</div>
        <div className={styles.mainContainer}>
          <div className={styles.listContainer}>
            <div className={styles.searchBar}>
              <input className={styles.listSearchWord} type="text" />
              <Button>
                <SearchIcon className={styles.searchIcon} />
              </Button>
            </div>
            <div>
              {teamList.map((data) => (
                <ChatItem
                  teamId={data.teamId}
                  picture={data.picture} //アイコン
                  alt={"チーム画像"}
                  teamName={data.teamName} //チーム名
                  subtitle={"z"} //最新コメント
                  dateString={"2020/08/05 10:10"} //最新コメントの時刻
                  handleShow={(teamId, name) => handleShow(teamId, name)} //チャット内容表示
                />
              ))}
            </div>
          </div>
          {/* グループをクリックしたら以下チャット内容を表示 */}
          {show ? (
            <div className={styles.messageContainer}>
              <div className={styles.searchBar}>
                <div className={styles.roomName}>チャット相手の名前</div>
                <input className={styles.messageSearchWord} type="text" />
                <Button>
                  <SearchIcon className={styles.searchIcon} />
                </Button>
              </div>
              <div id="messageArea" className={styles.messageArea}>
                {messageData.map((data) => (
                  <Message
                    avatar={data.avatar}
                    uid={data.uid} //メッセージの位置
                    text={data.text} //メッセージのテキスト
                    dateString={data.dateString.slice(0, 16)} //時間
                  />
                ))}
              </div>
              <div className={styles.messageActionArea}>
                <textarea
                  id="messageValue"
                  className={styles.submitText}
                  placeholder="テキストを入力"
                  maxlength="200" //ほぼ意味なし
                  required //意味なし
                />
                <Button variant="contained" onClick={() => addMessage()}>
                  送信
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default Chat;

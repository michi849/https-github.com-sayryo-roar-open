import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/index";
const Auth = (props) => {
  const [signinCheck, setSigninCheck] = useState(false), //認証処理が完了してるか
    [signedIn, setSignedIn] = useState(false); //ログインしてるか

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //ログインしている
        setSignedIn(true);
        props.toggleSidebar(true);
      } else {
        //していない
        setSignedIn(false);
      }
      setSigninCheck(true); //認証完了
      return () =>
        //unmounting時
        auth.onAuthStateChanged();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //認証チェック中(ローディング)
  if (!signinCheck) {
    return <></>;
  }
  if (signedIn) {
    //ログインしているとき（そのまま表示）
    return props.children;
  } else {
    //していないとき（ログイン画面にリダイレクト）
    return <Redirect to="/" />;
  }
};

export default Auth;

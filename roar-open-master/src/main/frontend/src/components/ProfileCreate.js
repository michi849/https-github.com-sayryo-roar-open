import React, { useState, useEffect } from "react";
import Spinner from "../UIkit/Spinner";

import styles from "../style/ProfileCreate.module.css";
import { Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { TextField, Button, Icon } from "@material-ui/core";
import { CreatePhoto } from "../UIkit/index";
import { auth } from "../firebase/index";
import axios from "axios";
// import { defaultProps } from "react-select/src/Select";

const url = "http://localhost:8080/api/profile";

const ProfileCreate = (props) => {
  const [icon, setIcon] = useState(""),
    [profile, setProfile] = useState(""),
    [activity, setActivity] = useState(""),
    [like, setLike] = useState(""),
    [sns, setSns] = useState(""),
    [gallery, setGallery] = useState(""),
    [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    //name属性に応じてvalueをセット
    switch (e.target.name) {
      case "profile":
        setProfile(e.target.value);
        break;
      case "activity":
        setActivity(e.target.value);
        break;
      case "like":
        setLike(e.target.value);
        break;
      case "sns":
        setSns(e.target.value);
        break;
      case "gallery":
        setGallery(e.target.value);
        break;
      //no default
    }
  };
  //ユーザーのプロフィール情報を取得する
  const UserInfo = () => {
    //送信
    axios
      .get(url + "/" + auth.currentUser.uid) //パスパラメータにユーザーIDを追加
      .then((res) => {
        setIcon(res.data.icon);
        setProfile(res.data.profile);
        setActivity(res.data.activity);
        setLike(res.data.likes);
        setSns(res.data.sns);
        setGallery(res.data.gallery);
        setLoading(!loading);
      })
      .catch((error) => {
        alert(error);
      });
  };
  //初回レンダリング時に、ユーザーのプロフィール情報が取得できる。
  useEffect(() => {
    UserInfo();
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    //通常の送信処理等を停止
    e.preventDefault();
    //送信
    axios
      .post(url, {
        uid: auth.currentUser.uid,
        icon: icon,
        profile: profile,
        activity: activity,
        likes: like,
        sns: sns,
        gallery: gallery,
      })
      .then(() => {
        props.history.push("/ProfileEditComplete");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getImages = (url) => {
    setIcon(url);
  };
  if (loading === false) {
    return <Spinner />;
  } else {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.profileCreateTitle}>プロフィール編集</div>
          {/* <div>
          <Link className={styles.profileCreatePreviewBtn} to="/Home">
            変更せずに戻る
          </Link>
        </div> */}
        </header>
        <div className={styles.main}>
          <Form onSubmit={handleFormSubmit}>
            {/* <div className={styles.profileItem}>アイコン</div> */}
            <CreatePhoto
              height={140}
              width={140}
              getImages={getImages}
              firstImages={icon}
              myTitle="アイコン"
              storageFolder={"images"}
            />
            <div className={styles.mainContent}>
              <div className={styles.mainContentLeft}>
                <div className={styles.profileItem}>プロフィール</div>
                <TextField
                  name="profile"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={profile}
                  className={styles.profileItemValue}
                  onChange={handleChange}
                />

                <div className={styles.profileItem}>活動</div>
                <TextField
                  name="activity"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={activity}
                  className={styles.profileItemValue}
                  onChange={handleChange}
                />

                <div className={styles.profileItem}>趣味</div>
                <TextField
                  name="like"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={like}
                  className={styles.profileItemValue}
                  onChange={handleChange}
                />

                <div className={styles.profileItem}>SNS</div>
                <TextField
                  name="sns"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={sns}
                  className={styles.profileItemValue}
                  onChange={handleChange}
                />
              </div>
              {/* <div className={styles.mainContentRight}>
              <div className={styles.profileItem}>ギャラリー</div>
              <div>
                <Form.Group>
                  <Form.File name="" value="" />
                </Form.Group>
              </div>
            </div> */}
            </div>
            <div className={styles.submitBtn}>
              <Button type="submit" variant="contained" color="primary">
                プロフィールに反映させる
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
};

export default withRouter(ProfileCreate);

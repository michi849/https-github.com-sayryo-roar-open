import React, { useState, useEffect } from "react";
import styles from "../style/Top.module.css";
import { Container, Button, ButtonToolbar, Modal, Form } from "react-bootstrap";
import { auth, db } from "../firebase/index";
import { Spinner } from "../UIkit/index";

const Top = (props) => {
  const [login, isLoginShow] = useState(false),
    [register, isRegisterShow] = useState(false),
    [login_email, setLogEmail] = useState(""),
    [login_pass, setLogPass] = useState(""),
    [register_user, setRegUser] = useState(""),
    [register_email, setRegEmail] = useState(""),
    [register_pass, setRegPass] = useState(""),
    [login_text, setLogin_text] = useState(false),
    [register_text, setRegister_text] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //ログインしていたらHomeへ
        props.history.push("/Home");
      }
    });
  }, []);

  //modalの切り替え
  const toggleModal = () => {
    isLoginShow(!login);
    isRegisterShow(!register);
  };

  //ボタンの回転のオンオフ
  const toggleSpinner = (flag) => {
    setLogin_text(flag);
    setRegister_text(flag);
  };

  //送信中ボタンを更新マークにする
  const login_button_text = login_text ? (
    <div className="d-flex justify-content-center spinner-border text-light spinner-border-sm">
      <Spinner />
    </div>
  ) : (
    "ログイン"
  );
  const register_button_text = register_text ? (
    <div className="d-flex justify-content-center spinner-border text-light spinner-border-sm">
      <Spinner />
    </div>
  ) : (
    "登録"
  );

  //テキストをセット
  const handleChange = (e) => {
    //name属性に応じてvalueをセット
    switch (e.target.name) {
      case "login_email":
        setLogEmail(e.target.value);
        break;
      case "login_pass":
        setLogPass(e.target.value);
        break;
      case "register_user":
        setRegUser(e.target.value);
        break;
      case "register_email":
        setRegEmail(e.target.value);
        break;
      case "register_pass":
        setRegPass(e.target.value);
        break;
      //no default
    }
  };

  //ログイン認証
  const sendLogin = () => {
    return new Promise((resolve) => {
      if (login) {
        auth
          .signInWithEmailAndPassword(login_email, login_pass)
          .then(() => {
            //正常終了時
            props.history.push("/Home");
          })
          .catch((error) => {
            toggleSpinner(false);
            alert("送信エラー　" + error);
          });
      } else if (register) {
        //新規登録認証
        auth
          .createUserWithEmailAndPassword(register_email, register_pass)
          .then(() => {
            //正常終了時
            resolve();
            props.history.push("/Home");
          })
          .catch((error) => {
            toggleSpinner(false);
            alert("送信エラー　" + error);
          });
      }
    });
  };

  //ユーザー名をfireStoreに登録
  const sendRegister = () => {
    sendLogin().then(() => {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .set({
          name: register_user,
        })
        .then(function () {})
        .catch(function (error) {
          alert("登録エラー　Error writing document：" + error);
        });
    });
  };

  //送信
  const handleFormSubmit = (e) => {
    //通常の送信処理等を停止
    e.preventDefault();
    toggleSpinner(true);
    sendRegister();
  };

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <Container>
          {/* <!-- ログイン新規会員登録モーダルの右上寄せブロック --> */}
          <ButtonToolbar className="p-3 justify-content-end">
            <div className={styles.btn} onClick={() => isLoginShow(true)}>
              ログイン
            </div>
            <div className={styles.btn} onClick={() => isRegisterShow(true)}>
              新規会員登録
            </div>

            <Modal show={login} onHide={() => isLoginShow(false)}>
              <Modal.Header>
                <Modal.Title className={styles.modalTitle}>
                  ログイン
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formBasicEmail" className="m-3">
                    <Form.Label className="mb-3">メールアドレス</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="メールアドレスを入力"
                      name="login_email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="m-3">
                    <Form.Label className="mb-3">
                      パスワード
                      <span className={styles.small}>(半角英数字6~16桁)</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="パスワードを入力"
                      name="login_pass"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="m-3">
                    {/* ログインボタンのテキスト */}
                    {login_button_text}
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Form.Text className="text-muted m-2">
                  アカウントをお持ちでない場合、
                  <span className="btn btn-link" onClick={() => toggleModal()}>
                    新規会員登録
                  </span>
                </Form.Text>
              </Modal.Footer>
            </Modal>

            <Modal show={register} onHide={() => isRegisterShow(false)}>
              <Modal.Header>
                <Modal.Title className={styles.modalTitle}>
                  アカウントを作成
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formBasicName" className="m-3">
                    <Form.Label className="mb-3">ユーザーネーム</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="ユーザーネームを入力"
                      name="register_user"
                      onChange={handleChange}
                      required
                      pattern="\S+.*" // 始まりは空白以外\S 以後は+ 文字. 全て* 許可
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="m-3">
                    <Form.Label className="mb-3">メールアドレス</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="メールアドレスを入力"
                      name="register_email"
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="m-3">
                    <Form.Label className="mb-3">
                      パスワード
                      <span className={styles.small}>(半角英数字6~16桁)</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="パスワードを入力"
                      name="register_pass"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="m-3">
                    {/* 登録ボタンのテキスト */}
                    {register_button_text}
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Form.Text className="text-muted m-2">
                  すでにアカウントをお持ちの場合、
                  <span className="btn btn-link" onClick={() => toggleModal()}>
                    ログイン
                  </span>
                </Form.Text>
              </Modal.Footer>
            </Modal>
          </ButtonToolbar>
        </Container>
      </section>

      <section>
        <Container>
          {/* <!-- 真ん中のメッセージブロック --> */}
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src="https://firebasestorage.googleapis.com/v0/b/roar-b54b1.appspot.com/o/logo%2Froar%E3%83%AD%E3%82%B3%E3%82%99.png?alt=media&token=592910ac-6be1-48fd-8454-dc40828de9bb" />
            </div>
            <div className={styles.leadText}>
              <p>スポーツ専門のチャットツールでチームの輪を広げよう</p>
              <p>簡単にチームのメンバーを募れる</p>
              <p>スポーツコミュニティユーザー数世界１位</p>
              <p>さあ、今すぐroarで新しい体験を...</p>
            </div>
            {/* <!--  ページ下部の登録ボタンのブロック--> */}
            <div className={styles.startUp}>
              <button
                className="btn btn-outline-light btn-lg px-5"
                onClick={() => isRegisterShow(true)}
              >
                今すぐはじめる
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Top;

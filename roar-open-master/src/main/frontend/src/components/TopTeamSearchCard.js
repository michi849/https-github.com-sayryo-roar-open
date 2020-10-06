import React, { useState } from "react";

// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { FaUserFriends } from "react-icons/fa";

// css modules
import styles from "../style/TeamSearchCard.module.css";

import TopTeamSearchCardModal from "./TopTeamSearchCardModal";

export const TopTeamSearchCard = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.root}>
      <Grid container>
        <Grid item xs={4}>
          <div>
            <img
              className={styles.teamPicture}
              src={props.picture}
              height="225"
              alt="チーム画像は、まだありません"
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <h2 className={styles.teamNameContent}>{props.team_name}</h2>
              <Button
                className={styles.detailButton}
                size="small"
                color="primary"
                onClick={handleOpen}
              >
                詳細を確認する
              </Button>
            </div>
            <div className={styles.teamInfoContainer}>
              {props.prefectures == "" ? (
                //活動曜日が登録されていなければ空要素を返す
                <></>
              ) : (
                //活動曜日が登録されていれば、以下の要素を返す
                <p className={styles.teamInfoBlock}>
                  <span className={styles.prefectures}>活動拠点</span>
                  <span>{props.prefectures}</span>
                </p>
              )}
              {props.sport_name == "" ? (
                //スポーツが登録されていなければ空要素を返す
                <></>
              ) : (
                //スポーツが登録されていれば以下の要素を返す
                <p className={styles.teamInfoBlock}>
                  <span className={styles.sportName}>スポーツ</span>
                  <span>{props.sport_name}</span>
                </p>
              )}
            </div>
            <p className={styles.teamConcept}>{props.team_concept}</p>
            <p className={styles.teamMemberContainer}>
              <span className={styles.teamMember}>
                <FaUserFriends />
              </span>
              <span>{props.count}人</span>
            </p>
          </div>
        </Grid>
      </Grid>
      {/* チーム詳細を表示するモーダル */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        className={styles.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <TopTeamSearchCardModal />
        </Fade>
      </Modal>
    </div>
  );
};

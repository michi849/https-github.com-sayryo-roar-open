import React, { useState } from "react";
import { auth } from "../firebase/index";
import axios from "axios";
//propsにhistoryを渡すため
import { Link } from "react-router-dom";
import TeamEdit from "./TeamEdit";
import styles from "../style/TeamListDetail.module.css";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

import { GiJapan, GiRunningShoe } from "react-icons/gi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DiCodeigniter } from "react-icons/di";

const TeamListDetail = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  //チームの退会
  const handleWithdraw = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.team_details_title}>チーム詳細</div>
      <div className={styles.team_details_main}>
        <p className={styles.team_name}>{props.team_name}</p>
        <img
          className={styles.teamPicture}
          src={props.picture}
          alt="チーム画像"
        />
        <p className={styles.team_info_title}>基本プロフィール</p>
        <div className={styles.team_info_container}>
          <div className={styles.team_info_card}>
            <div
              className={`${styles.team_info_card_title} ${styles.sport_name_background_color}`}
            >
              <GiRunningShoe className={styles.team_info_card_icon} />
              スポーツ
            </div>
            <div className={styles.team_info_card_body}>
              <p className={styles.team_info_card_value}>{props.sport_name}</p>
            </div>
          </div>
          <div className={styles.team_info_card}>
            <div
              className={`${styles.team_info_card_title} ${styles.prefectures_background_color}`}
            >
              <GiJapan className={styles.team_info_card_icon} />
              活動地域
            </div>
            <div className={styles.team_info_card_body}>
              <p className={styles.team_info_card_value}>{props.prefectures}</p>
            </div>
          </div>
          <div className={styles.team_info_card}>
            <div
              className={`${styles.team_info_card_title} ${styles.activity_frequency_background_color}`}
            >
              <DiCodeigniter className={styles.team_info_card_icon} />
              活動頻度
            </div>
            <div className={styles.team_info_card_body}>
              <p className={styles.team_info_card_value}>
                {props.activity_frequency}
              </p>
            </div>
          </div>
          <div className={styles.team_info_card}>
            <div
              className={`${styles.team_info_card_title} ${styles.day_of_the_week_background_color}`}
            >
              <FaRegCalendarAlt className={styles.team_info_card_icon} />
              活動曜日
            </div>
            <div className={styles.team_info_card_body}>
              <p className={styles.team_info_card_value}>
                {props.day_of_the_week}
              </p>
            </div>
          </div>
        </div>
        <p className={styles.team_info_title}>チームコンセプト</p>
        <p className={styles.team_concept}>{props.team_concept}</p>
        <div className={styles.edit_btn}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            内容を編集する
            <Link to="/TeamEdit" />
          </Button>
          {/* </Link> */}
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
              <TeamEdit team_id={props.team_id} />
            </Fade>
          </Modal>
        </div>
        <div className={styles.withdraw_btn}>
          <Button variant="contained" size="small" onClick={handleWithdraw}>
            チームを退会する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamListDetail;

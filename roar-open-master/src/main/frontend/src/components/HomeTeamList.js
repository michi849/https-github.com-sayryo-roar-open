import React, { useState } from "react";
import styles from "../style/HomeTeamList.module.css";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

import TeamListDetail from "./TeamListDetail";

const HomeTeamList = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.teamListImg} src={props.data.picture} />
      </div>
      <div className={styles.mainContainer}>
        <p className={styles.teamName}>{props.data.teamName}</p>
        <div className={styles.teamInfo}>
          <p className={styles.teamMember}>メンバー : {props.data.count}人</p>
          <Button className={styles.teamDetail} onClick={handleOpen}>
            チーム詳細
          </Button>
        </div>
      </div>
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
          <TeamListDetail
            data={props.data}
            team_id={props.data.teamId}
            team_name={props.data.teamName}
            picture={props.data.picture}
            sport_name={props.data.sportName}
            prefectures={props.data.prefectures}
            activity_frequency={props.data.activityFrequency}
            day_of_the_week={props.data.dayOfTheWeek}
            team_concept={props.data.teamConcept}
          />
        </Fade>
      </Modal>
    </div>
  );
};

export default HomeTeamList;

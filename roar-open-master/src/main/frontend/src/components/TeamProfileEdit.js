import React from "react";
import Select from "react-select";

import styles from "../style/TeamProfile.module.css";

// データの読み込み
import {
  SportName,
  Prefectures,
  ActivityFrequency,
  DayOfTheWeek,
} from "../data/data";

export const TeamProfileEdit = (props) => {
  return (
    <div className={styles.TeamProfileContainer}>
      <div className={styles.selectBlock}>
        <p className={styles.selectTitle}>競技</p>
        <Select
          className="profileSelect"
          isClearable
          isSearchable
          options={SportName}
          placeholder="何のスポーツ？"
          defaultInputValue={props.teamInfo.sportName}
          defaultValue={props.teamInfo.sportName}
          name="sport_name"
        />
      </div>
      <div className={styles.selectBlock}>
        <p className={styles.selectTitle}>活動拠点</p>
        <Select
          className="profileSelect"
          isMulti
          isClearable
          options={Prefectures}
          placeholder="どこで活動してる？"
          defaultInputValue={props.teamInfo.prefectures}
          defaultValue={props.teamInfo.prefectures}
          name="prefectures_name"
        />
      </div>
      <div className={styles.selectBlock}>
        <p className={styles.selectTitle}>活動頻度</p>
        <Select
          className="profileSelect"
          isClearable
          options={ActivityFrequency}
          placeholder="どれくらい活動してる？"
          defaultInputValue={props.teamInfo.activityFrequency}
          defaultValue={props.teamInfo.activityFrequency}
          name="activity_frequency_name"
        />
      </div>
      <div className={styles.selectBlock}>
        <p className={styles.selectTitle}>活動曜日</p>
        <Select
          className="profileSelect"
          isMulti
          isClearable
          options={DayOfTheWeek}
          placeholder="何曜日に活動してる？"
          defaultInputValue={props.teamInfo.dayOfTheWeek}
          defaultValue={props.teamInfo.dayOfTheWeek}
          name="day_of_the_week_name"
        />
      </div>
    </div>
  );
};

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

export const TeamProfile = () => {
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
          name="day_of_the_week_name"
        />
      </div>
    </div>
  );
};

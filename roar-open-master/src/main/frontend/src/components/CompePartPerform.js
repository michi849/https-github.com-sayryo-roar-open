import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

// 大会参加実績を入力する要素
export const CompePartPerform = (props) => {
  // 参加年に記述されたの値を取得するためのStateと関数
  const [partYear, setPartYear] = useState("");
  const partYearChange = (e) => {
    setPartYear(e.target.value);
  };

  // 大会名に記述された値を取得するためのStateと関数
  const [compeName, setCompeName] = useState("");
  const compeNameChange = (e) => {
    setCompeName(e.target.value);
  };

  return (
    <div className="compePartPerform">
      <TextField
        className="partYear"
        label="参加年"
        variant="standard"
        // DBに値を送るための記述
        name=""
        value={partYear}
        onChange={partYearChange}
      />
      <span></span>
      <TextField
        className="compeName"
        label="大会名"
        variant="standard"
        // DBに値を送るための記述
        name=""
        value={compeName}
        onChange={compeNameChange}
      />
    </div>
  );
};

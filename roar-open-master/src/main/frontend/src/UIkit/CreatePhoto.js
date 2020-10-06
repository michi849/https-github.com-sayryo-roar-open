import React, { useState, useEffect } from "react";

// material-UIの読み込み
import Button from "@material-ui/core/Button";

// CSSの読み込み
import "../style/CreatePhoto.css";
import { makeStyles } from "@material-ui/core";

// firebaseのstorage
import { storage } from "../firebase/index";

// スタイリングをする。
const useStyle = makeStyles({
  trimming: {
    objectFit: "cover",
  },
});

// ファイルサイズを縮小させるための記述（ここは変数を定義する）
let files = ""; //取得したファイルを格納するための変数
let fileName = ""; //16桁を格納するための画像名

const CreatePhoto = (props) => {
  const [image_src, set_image_src] = useState("");
  const classes = useStyle();

  //初期画面の設定
  useEffect(() => {
    set_image_src(props.firstImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ユーザーが画像を選択した時に実行される処理
  const handleChangeFile = (e) => {
    //前回プレビューした画像があり、
    //現在保存されている画像でなければfirebaseStorageから削除
    if (fileName.length > 0 && fileName !== props.firstImages.slice(78, 94)) {
      storage.ref(props.storageFolder).child(fileName).delete();
    }

    files = e.target.files; //取得したファイルデータをfilesに格納する

    //blob型に変換
    let blob = new Blob(files, { type: "image/jpeg" });
    //保存された画像名をランダムに作成
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");
    //storageのフォルダへアップロード
    const uploadRef = storage.ref(props.storageFolder).child(fileName);
    const uploadTask = uploadRef.put(blob);

    //up成功時
    uploadTask.then(() => {
      //URL取得
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = { id: fileName, path: downloadURL };
        // 画像をpreviewするための処理。
        let image_url = files.length === 0 ? "" : newImage.path;
        set_image_src(image_url);
        //親へURLを渡す
        props.getImages(newImage.path);
      });
    });
  };

  return (
    <div>
      <div className="imgPreview">
        <img
          id="image"
          className={classes.trimming}
          src={image_src}
          alt=""
          name=""
          value={image_src}
          height={props.height}
          width={props.width}
        />
      </div>
      <div className="imgUploadBtn">
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChangeFile}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            {props.myTitle}を選択
          </Button>
        </label>
      </div>
    </div>
  );
};

export default CreatePhoto;

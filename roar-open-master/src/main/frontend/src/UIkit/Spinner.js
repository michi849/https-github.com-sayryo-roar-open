import React from "react";

const Spinner = () => {
  return (
    <div>
      <div role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;

//使うとき
{
  /* <div className={styles.flexCenter}>
         <div className="spinner-border text-primary">
         <Spinner />
        </div>
     </div>
*/
}
// css
// .flexCenter {
//   display: flex; /* 子要素をflexboxで揃える */
//   flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
//   justify-content: center; /* 子要素をflexboxにより中央に配置する */
//   align-items: center; /* 子要素をflexboxにより中央に配置する */
//   width: 100%;
//   height: 100%;
// }

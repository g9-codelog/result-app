import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      {/* <div className={style.container}>
        <span className={style.flame}>
          <h2>Loading...</h2>
        </span>
      </div> */}
      <div className={style.container}>
        <span className={style.circle}></span>
      </div>
    </>
  );
}

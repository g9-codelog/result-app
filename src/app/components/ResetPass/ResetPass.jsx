"use client";

import React, { useState } from "react";
import styles from "./ResetPass.module.css";
import { db } from "../../../firebase";
import {
  ActionCodeOperation,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import Link from "next/link";

const ResetPass = () => {
  const [email, setEmail] = useState("");

  async function doRegistter() {
    const auth = getAuth();
    const actionCodeSettings = {
      url: "https://result-app-nine.vercel.app/",
      handleCodeInApp: false,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        alert("メールが送信されました");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.reset}>
        <h1>パスワードの再設定</h1>
        <p className={styles.explanatory}>
          入力されたメールアドレスにパスワードを再設定
          <br />
          するページのURLを送信します
        </p>

        <form>
          <p>Email</p>

          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button onClick={doRegistter}>送信</button>
        <Link href="/" className={styles.link}>
          戻る
        </Link>
      </div>
    </div>
  );
};

export default ResetPass;

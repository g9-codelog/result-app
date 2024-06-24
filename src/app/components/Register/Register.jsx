"use client";

import React, { useState } from "react";
import styles from "./Register.module.css";
import { db } from "../../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  async function doRegistter() {
    try {
      if (password.length < 6) {
        alert("パスワードは6文字以上で設定してください");
        return;
      }
      if (password === "" || secondPassword === "") {
        alert("入力事項を確認してください");
      } else {
        if (password === secondPassword) {
          const auth = getAuth();

          const userCreadential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCreadential.user;
          await sendEmailVerification(user);
          alert("確認メールが送信されました");
        } else {
          alert("パスワードが一致しません");
        }
      }
    } catch {
      alert("エラーです");
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <h1>新規登録</h1>

        <form>
          <p>Email</p>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>password</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <p>password（確認）</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setSecondPassword(e.target.value)}
          />
        </form>
        <button onClick={doRegistter}>登録</button>
        <Link href="/" className={styles.link}>
          戻る
        </Link>
      </div>
    </div>
  );
};

export default Register;

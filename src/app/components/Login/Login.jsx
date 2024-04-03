"use client";
import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function doLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("ログインに成功しました");
      })
      .catch((error) => {
        alert("ログインに失敗しました");
        console.log(error);
      });
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <h1>ログイン画面</h1>
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
          />
        </form>
        <button onClick={() => doLogin()}>ログイン</button>
        <Link href="/register" className={styles.link}>
          新規登録
        </Link>
      </div>
    </div>
  );
}

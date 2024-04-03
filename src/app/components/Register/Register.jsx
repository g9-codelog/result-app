"use client";

import React, { useState } from "react";
import styles from "./Register.module.css";
import { db } from "../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function doRegistter() {
    if (password === process.env.NEXT_PUBLIC_PASS) {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("完了");
          console.log(user);
        })
        .catch((error) => console.log(error));
    } else {
      alert("パスワードが違います");
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

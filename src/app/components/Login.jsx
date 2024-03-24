"use client";
import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function doLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        props.handleCurrentChange();
        alert("ログインに成功しました");
      })
      .catch((error) => {
        alert("ログインに失敗しました");
        console.log(error);
      });
  }
  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={() => doLogin()}>ログイン</button>
    </div>
  );
}

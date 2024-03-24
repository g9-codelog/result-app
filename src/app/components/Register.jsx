"use client";

import React, { useState } from "react";
import { db } from "../../firebase";
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
    <div>
      <Link href="/">戻る</Link>
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
      <button onClick={doRegistter}>登録</button>
    </div>
  );
};

export default Register;

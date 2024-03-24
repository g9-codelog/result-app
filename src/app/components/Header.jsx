"use client";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import Login from "./Login";

export default function Header() {
  const { currentUser } = getAuth();
  const [current, setCurrent] = useState();

  function doLogout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        alert("ログアウト");
        setCurrent("");
      })
      .catch((error) => console.log(error));
  }

  function handleCurrentChange() {
    setCurrent(currentUser);
  }

  return (
    <div>
      {currentUser ? (
        <div suppressHydrationWarning={true}>
          <div>{currentUser.email}</div>
          <button onClick={doLogout}>ログアウト</button>
        </div>
      ) : (
        <div suppressHydrationWarning={true}>
          <Login handleCurrentChange={handleCurrentChange} />
        </div>
      )}
    </div>
  );
}

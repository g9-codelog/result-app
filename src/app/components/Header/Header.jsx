"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { getAuth, signOut } from "firebase/auth";
import Login from "../Login/Login";
import Link from "next/link";
import DataBox from "../DataBox";
import { useAuth } from "../../AuthProvider";

const Header = React.memo(({ setYear, setName, yearSelect }) => {
  const { currentUser } = useAuth();
  function doLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("ログアウト");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Sunny System</h1>
      </Link>
      <div className={styles.menuWrapper}>
        <Link href="/invidisual" className={styles.menu}>
          個人成績
        </Link>
        <Link href="/subjectAverage" className={styles.menu}>
          平均偏差値推移
        </Link>
      </div>
      <div className={styles.dataBox}>
        <DataBox setYear={setYear} setName={setName} yearSelect={yearSelect} />
      </div>
      <div className={styles.accountWrapper}>
        {currentUser ? (
          <div suppressHydrationWarning={true} className={styles.account}>
            <div>
              <button>
                <Link href="/about">設定画面</Link>
              </button>
              <button onClick={doLogout}>ログアウト</button>
            </div>
            <p>
              {currentUser.email.substring(0, currentUser.email.indexOf("@"))}
            </p>
          </div>
        ) : (
          <div suppressHydrationWarning={true}>
            <Login />
          </div>
        )}
      </div>
    </div>
  );
});

export default Header;

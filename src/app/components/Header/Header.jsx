"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
import Login from "../Login/Login";
import Link from "next/link";
import DataBox from "../DataBox";
import { YearSelectProvider } from "../../YeasrSelectProvider";
import { useAuth } from "../../AuthProvider";

const Header = React.memo(({ setYear, setName, yearSelect }) => {
  const { currentUser } = useAuth();
  let verified;
  if (currentUser) {
    verified = currentUser.emailVerified;
    console.log(verified);
  }
  function doLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("ログアウト");
      })
      .catch((error) => console.log(error));
  }
  async function sendVerificationEmail() {
    sendEmailVerification(currentUser);
    alert("認証メールを送信しました");
  }
  return (
    <>
      {currentUser ? (
        <>
          {verified ? (
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
                <Link href="/ComparisonPreYears" className={styles.menu}>
                  過年度比較
                </Link>
                {/* <Link href="/Frequency" className={styles.menu}>
                  度数分布
                </Link> */}
              </div>
              <div className={styles.dataBox}>
                <YearSelectProvider>
                  <DataBox
                    setYear={setYear}
                    setName={setName}
                    yearSelect={yearSelect}
                  />
                </YearSelectProvider>
              </div>
              <div className={styles.accountWrapper}>
                <div suppressHydrationWarning={true} className={styles.account}>
                  <div>
                    <button>
                      <Link href="/about">設定画面</Link>
                    </button>
                    <button onClick={doLogout}>ログアウト</button>
                  </div>
                  <p>
                    {currentUser.email.substring(
                      0,
                      currentUser.email.indexOf("@")
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.uncertified}>
              <h2>メールアドレスが未認証です</h2>
              <p>
                認証メールのリンクから、メールアドレスの認証を完了させてください
              </p>
              <div className={styles.uncertifiedButtons}>
                <button onClick={sendVerificationEmail}>
                  認証メールを再送する
                </button>
                <button onClick={doLogout}>ログアウト</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div suppressHydrationWarning={true}>
          <Login />
        </div>
      )}
    </>
  );
});

export default Header;

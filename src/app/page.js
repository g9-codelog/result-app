"use client";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function Home() {
  const [yearSelect, setYearSelect] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log(currentUser.emailVerified);
  }
  return (
    <main className={styles.main}>
      <Header setYear={setYearSelect} yearSelect={yearSelect} />
    </main>
  );
}

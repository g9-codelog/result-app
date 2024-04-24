"use client";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import { useState } from "react";

export default function Home() {
  const [yearSelect, setYearSelect] = useState("");
  const [nameList, setNameList] = useState([]);

  return (
    <main className={styles.main}>
      <Header
        setYear={setYearSelect}
        setName={setNameList}
        yearSelect={yearSelect}
      />
    </main>
  );
}

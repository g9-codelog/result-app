"use client";
import styles from "../page.module.css";
import Header from "../components/Header/Header";
import Sample from "../components/Invidisual";
import { AuthProvider } from "../AuthProvider";
import { useState } from "react";

export default function Home() {
  const [yearSelect, setYearSelect] = useState("");
  const [nameList, setNameList] = useState([]);
  let dataLabel = ["第1回高2", "第2回高2", "第3回高2", "全統記述", "全統共テ"];

  return (
    <main className={styles.main}>
      <Header
        setYear={setYearSelect}
        setName={setNameList}
        yearSelect={yearSelect}
      />
      <Sample
        nameList={nameList}
        dataLabel={dataLabel}
        yearSelect={yearSelect}
      />
    </main>
  );
}

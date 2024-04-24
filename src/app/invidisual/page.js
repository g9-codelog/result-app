"use client";
import styles from "../page.module.css";
import Header from "../components/Header/Header";
import Invidisual from "../components/Invidisual";
import { useState } from "react";

export default function Home() {
  const [yearSelect, setYearSelect] = useState("");
  const [nameList, setNameList] = useState([]);
  let dataLabel = [
    "第1回高2",
    "第2回高2",
    "第3回高2",
    "全統記述",
    "全統共テ",
    "高3第1回共テ",
    "高3第1回記述",
    "高3第2回共テ",
    "高3第2回記述",
    "高3第3回記述",
    "高3第3回共テ",
    "高3全統プレ",
  ];

  return (
    <main className={styles.main}>
      <Header
        setYear={setYearSelect}
        setName={setNameList}
        yearSelect={yearSelect}
      />
      <Invidisual
        nameList={nameList}
        dataLabel={dataLabel}
        yearSelect={yearSelect}
      />
    </main>
  );
}

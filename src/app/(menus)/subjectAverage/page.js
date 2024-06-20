"use client";
import styles from "../../page.module.css";
import Header from "../../components/Header/Header";
import SubjectAve from "../../components/SubjectAve";
import { useState } from "react";
import { dataLabel } from "../../datas";

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
      <SubjectAve
        nameList={nameList}
        dataLabel={dataLabel}
        yearSelect={yearSelect}
      />
    </main>
  );
}

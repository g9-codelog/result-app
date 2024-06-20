"use client";
import styles from "../../page.module.css";
import Header from "../../components/Header/Header";
import Frecuency from "../../components/Frequency/Frequency";
import { useState } from "react";
import { YearSelectProvider } from "../../YeasrSelectProvider";
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
      <YearSelectProvider>
        <Frecuency
          nameList={nameList}
          dataLabel={dataLabel}
          yearSelect={yearSelect}
        />
      </YearSelectProvider>
    </main>
  );
}

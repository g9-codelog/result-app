"use client";
import styles from "../../page.module.css";
import Header from "../../components/Header/Header";
import { useState } from "react";
import ComparisonPreYears from "../../components/ComparisonPreYears/ComparisonPreYears";
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
        <ComparisonPreYears
          nameList={nameList}
          dataLabel={dataLabel}
          yearSelect={yearSelect}
        />
      </YearSelectProvider>
    </main>
  );
}

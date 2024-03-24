"use client";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import Sample from "./Invidisual";
import Link from "next/link";

const DataBox = () => {
  const [yearSelect, setYearSelect] = useState("");
  const [nameList, setNameList] = useState([]);
  let dataLabel = ["第1回高2", "第2回高2", "第3回高2", "全統記述", "全統共テ"];

  const handleDataRead = useCallback(() => {
    let dummyArray = [];
    if (yearSelect) {
      getDocs(collection(db, yearSelect)).then((snap) => {
        dummyArray = snap.docs.map((dd) => dd.data());
        if (dummyArray.length) {
          dummyArray = Object.values(dummyArray[0]);
          setNameList(dummyArray);
        } else {
          setNameList([]);
        }
      });
    }
  }, [yearSelect]);
  return (
    <div>
      <Link href="/about">設定画面</Link>
      <Link href="/register">登録画面</Link>
      <br />
      <select
        value={yearSelect}
        onChange={(e) => setYearSelect(e.target.value)}
        name="yearSelect"
      >
        <option></option>
        <option>2022年度入学</option>
        <option>2023年度入学</option>
      </select>
      <button onClick={handleDataRead}>取得</button>
      <Sample
        nameList={nameList}
        dataLabel={dataLabel}
        yearSelect={yearSelect}
      />
    </div>
  );
};

export default DataBox;

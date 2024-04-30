"use client";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { YearSelectContext } from "../YeasrSelectProvider";

const DataBox = ({ setYear, setName, yearSelect }) => {
  const { yearSelects } = useContext(YearSelectContext);

  const handleDataRead = useCallback(() => {
    let dummyArray = [];
    if (yearSelect) {
      getDocs(collection(db, "全統模試結果", yearSelect, "名前")).then(
        (snap) => {
          dummyArray = snap.docs.map((dd) => dd.data());
          if (dummyArray.length) {
            dummyArray = Object.values(dummyArray[0]);
            setName(dummyArray);
          } else {
            setName([]);
          }
        }
      );
    }
  }, [yearSelect]);
  return (
    <div>
      <select
        value={yearSelect}
        onChange={(e) => setYear(e.target.value)}
        name="yearSelect"
      >
        <option></option>
        {yearSelects.map((year) => {
          return <option key={year}>{year}</option>;
        })}
      </select>
      <button onClick={handleDataRead}>取得</button>
    </div>
  );
};

export default DataBox;

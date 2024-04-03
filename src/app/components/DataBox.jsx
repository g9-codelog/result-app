"use client";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useState } from "react";

const DataBox = ({ setYear, setName, yearSelect }) => {
  const handleDataRead = useCallback(() => {
    let dummyArray = [];
    if (yearSelect) {
      getDocs(collection(db, yearSelect)).then((snap) => {
        dummyArray = snap.docs.map((dd) => dd.data());
        if (dummyArray.length) {
          dummyArray = Object.values(dummyArray[0]);
          setName(dummyArray);
        } else {
          setName([]);
        }
      });
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
        <option>2022年度入学</option>
        <option>2023年度入学</option>
      </select>
      <button onClick={handleDataRead}>取得</button>
    </div>
  );
};

export default DataBox;

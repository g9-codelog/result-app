"use client";

import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const YearSelectContext = React.createContext();

export function YearSelectProvider({ children }) {
  const [yearSelects, setYearSelects] = useState([]);

  useEffect(() => {
    let dummyArray = [];
    getDocs(collection(db, "年度一覧")).then((snap) => {
      snap.docs.map((dd) => {
        dummyArray = [...dummyArray, dd.data().collectionId];
        setYearSelects(dummyArray);
      });
    });
  }, []);

  const yearValue = useMemo(() => ({ yearSelects }), [yearSelects]);

  return (
    <div>
      <YearSelectContext.Provider value={yearValue}>
        {children}
      </YearSelectContext.Provider>
    </div>
  );
}

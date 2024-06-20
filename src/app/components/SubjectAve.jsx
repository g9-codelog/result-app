"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { SubjectSets } from "../datas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { border } from "@chakra-ui/react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SubjectAve({ nameList, dataLabel, yearSelect }) {
  const labels = dataLabel;

  const SubjectAveArray = [];
  const [graphDataArray, setGraphDataArray] = useState([]);

  useEffect(() => {
    let dummyArray = [];
    //データベースからデータを取得する。
    async function fechData() {
      if (yearSelect === "") {
        return;
      } else {
        for (let i = 0; i < dataLabel.length; i++) {
          await getDocs(
            collection(db, "全統模試結果", yearSelect, dataLabel[i])
          ).then((snap) => {
            if (snap.docs.length > 0) {
              dummyArray = [
                ...dummyArray,
                snap.docs.map((dd) => ({ ...dd.data(), id: dataLabel[i] })),
              ];
            } else {
              dummyArray = [...dummyArray, ""];
            }
          });
        }
      }
      for (let i = 0; i < dummyArray.length; i++) {
        let dummySubjectsAve = { id: dataLabel[i] };
        if (dummyArray[i].length !== 0) {
          for (let j = 0; j < SubjectSets.length; j++) {
            let numLength = 0;
            const SumSubject = dummyArray[i].reduce((acc, num) => {
              if (num[`${SubjectSets[j].id}Dev`]) {
                numLength += 1;
                acc += Number(num[`${SubjectSets[j].id}Dev`]);
              }
              return acc;
            }, 0);
            const SubjectAve = SumSubject / numLength;
            dummySubjectsAve[SubjectSets[j].name] = SubjectAve;
          }
        }
        SubjectAveArray.push(dummySubjectsAve);
      }
      setGraphDataArray(SubjectAveArray);
    }
    fechData();
  }, [yearSelect]);

  const graphData = {
    labels: labels,
    datasets: SubjectSets.map((subject) => {
      return {
        label: subject.name,
        data: graphDataArray.map((dd) => dd[subject.name]),
        borderColor: subject.borderColor,
        backgroundColor: subject.backgroundColor,
      };
    }),
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Line
        // ref={charRef}
        height={10}
        width={25}
        data={graphData}
        id="chart-key"
        // onClick={(e) => ComentSet(e)}
      />
    </div>
  );
}

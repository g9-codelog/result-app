"use client";

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { YearSelectContext } from "../../YeasrSelectProvider";
import { SubjectSets } from "../../datas";
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
import Loading from "../Loading/Loading";
import style from "./ComparisonPreYears.module.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonPreYears = ({ nameList, dataLabel, yearSelect }) => {
  const colorArray = [
    {
      borderColor: "rgb(75, 100, 192)",
      backgroundColor: "rgba(75, 100, 192, 0.2)",
    },
    {
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
    {
      borderColor: "rgb(153, 102, 255)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
  ];
  const labels = dataLabel;
  const { yearSelects } = useContext(YearSelectContext);
  const [results, setResults] = useState([]);
  const [graphDataArray, setGraphDataArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //データベースからデータを取得する。
    async function fechData() {
      let yearsDummyArray = [];
      setLoading(true);
      if (yearSelect !== "") {
        for (let i = 0; i < 5; i++) {
          let dummyArray = [];
          if (yearSelects[i]) {
            for (let j = 0; j < dataLabel.length; j++) {
              await getDocs(
                collection(db, "全統模試結果", yearSelects[i], dataLabel[j])
              ).then((snap) => {
                if (snap.docs.length > 0) {
                  dummyArray = [
                    ...dummyArray,
                    snap.docs.map((dd) => ({ ...dd.data(), id: dataLabel[j] })),
                  ];
                } else {
                  dummyArray = [...dummyArray, ""];
                }
              });
            }
          }
          yearsDummyArray.push(dummyArray);
        }
      }
      setLoading(false);
      setResults(yearsDummyArray);
    }
    fechData();
    console.log(loading);
  }, [yearSelect]);

  function resultShow(subject) {
    let dummySubjectAve = [];
    for (let i = 0; i < results.length; i++) {
      let SubjectAve = 0;
      for (let j = 0; j < labels.length; j++) {
        if (i === 0) {
          dummySubjectAve.push({ id: labels[j] });
        }

        if (results[i].length !== 0 && results[i][j].length !== 0) {
          let numLength = 0;
          const SumSubject = results[i][j].reduce((acc, num) => {
            if (num[`${subject}Dev`]) {
              numLength += 1;
              acc += Number(num[`${subject}Dev`]);
            }
            return acc;
          }, 0);
          SubjectAve = SumSubject / numLength;
          dummySubjectAve[j][yearSelects[i]] = SubjectAve;
        }
      }
      setGraphDataArray(dummySubjectAve);
    }
  }

  const graphData = {
    labels: labels,
    datasets: yearSelects.map((year, index) => {
      return {
        label: year,
        data: graphDataArray.map((data) => data[year]),
        borderColor: colorArray[index]["borderColor"],
        backgroundColor: colorArray[index]["backgroundColor"],
      };
    }),
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.container}>
          <div
            style={{
              border: "solid 2px",
              borderColor: "#ccc",
              padding: "2px 0",
              paddingLeft: "4px",
              paddingRight: "0",
            }}
          >
            {SubjectSets.map((subject) => {
              return (
                <div
                  key={subject.id}
                  style={{ display: "inline-block", marginRight: "20px" }}
                >
                  <label>
                    <input
                      type="radio"
                      value={subject.id}
                      name="subjects"
                      onChange={(e) => resultShow(e.target.value)}
                      style={{ marginRight: "3px" }}
                    />
                    <span>{subject.name}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <Line
            // ref={charRef}
            height={10}
            width={25}
            data={graphData}
            id="chart-key"
            // onClick={(e) => ComentSet(e)}
          />
        </div>
      )}
    </div>
  );
};

export default ComparisonPreYears;

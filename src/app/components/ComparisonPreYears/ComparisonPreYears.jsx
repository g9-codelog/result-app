"use client";

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { YearSelectContext } from "../../YeasrSelectProvider";
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
import { background, border } from "@chakra-ui/react";
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
  const labels = dataLabel;

  const SubjectSets = [
    {
      name: "英語",
      id: "En",
    },
    {
      name: "数学",
      id: "Mt",
    },
    {
      name: "数学１",
      id: "Mt1",
    },
    {
      name: "数学２",
      id: "Mt2",
    },
    {
      name: "国語",
      id: "ja",
    },
    {
      name: "現代文",
      id: "NJa",
    },
    {
      name: "古文",
      id: "An",
    },
    {
      name: "漢文",
      id: "CJa",
    },
    {
      name: "現古",
      id: "AJa",
    },
    {
      name: "物理",
      id: "Ph",
    },
    {
      name: "化学",
      id: "Ch",
    },
    {
      name: "生物",
      id: "Bi",
    },
    {
      name: "物理基礎",
      id: "BPh",
    },
    {
      name: "化学基礎",
      id: "BCh",
    },
    {
      name: "生物基礎",
      id: "BBi",
    },
    {
      name: "世界史",
      id: "WH",
    },
    {
      name: "日本史",
      id: "JH",
    },
    {
      name: "政治経済",
      id: "PE",
    },
    {
      name: "地理",
      id: "Ge",
    },
    {
      name: "倫理",
      id: "Et",
    },
    {
      name: "情報",
      id: "In",
    },
    {
      name: "総合1",
      id: "Com1",
    },
    {
      name: "総合2",
      id: "Com2",
    },
    {
      name: "英数",
      id: "EnMt",
    },
    {
      name: "英国",
      id: "EnJa",
    },
  ];
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

  const YearsAveArray = [];

  const { yearSelects } = useContext(YearSelectContext);
  const [results, setResults] = useState([]);
  const [graphDataArray, setGraphDataArray] = useState([]);

  useEffect(() => {
    //データベースからデータを取得する。
    async function fechData() {
      let yearsDummyArray = [];
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
      setResults(yearsDummyArray);
    }
    fechData();
  }, [yearSelect]);

  function resultShow(subject) {
    for (let i = 0; i < results.length; i++) {
      let dummySubjectAve = { year: yearSelects[i] };
      for (let j = 0; j < labels.length; j++) {
        if (results[i].length !== 0 && results[i][j].length !== 0) {
          let numLength = 0;
          const SumSubject = results[i][j].reduce((acc, num) => {
            if (num[`${subject}Dev`]) {
              numLength += 1;
              acc += Number(num[`${subject}Dev`]);
            }
            return acc;
          }, 0);
          const SubjectAve = SumSubject / numLength;
          dummySubjectAve[labels[j]] = SubjectAve;
        }
      }
      YearsAveArray.push(dummySubjectAve);
    }

    let dummyGraphDataArray = [];
    for (let i = 0; i < labels.length; i++) {
      let dummyGraphData = { id: labels[i] };
      for (let j = 0; j < YearsAveArray.length; j++) {
        if (YearsAveArray[j][labels[i]]) {
          dummyGraphData[YearsAveArray[j].year] = YearsAveArray[j][labels[i]];
        }
      }
      dummyGraphDataArray.push(dummyGraphData);
    }
    setGraphDataArray(dummyGraphDataArray);
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
    <div>
      <div
        style={{ border: "solid 2px", borderColor: "#ccc", padding: "2px 0" }}
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
  );
};

export default ComparisonPreYears;

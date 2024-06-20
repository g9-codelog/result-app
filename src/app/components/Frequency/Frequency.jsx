"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { db } from "../../../firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
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
  BarElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Frequency({ nameList, dataLabel, yearSelect }) {
  const labels = dataLabel;
  const { yearSelects } = useContext(YearSelectContext);
  const [results, setResults] = useState([]);
  const [graphDataArray, setGraphDataArray] = useState([]);
  const [graphType, setGraphType] = useState();
  const [graphLabel, setGraphLabel] = useState(yearSelects);
  const [testNum, setTestNum] = useState(null);
  const [selectSubject, setSelectSubject] = useState();
  const graphDatas = [
    {
      level: "~30",
      min: 0,
      max: 30,
      backgroundColor: "rgba(90, 90, 90, 0.75)",
    },
    {
      level: "30~40",
      min: 30,
      max: 40,
      backgroundColor: "rgba(75, 100, 192, 0.75)",
    },
    {
      level: "40~50",
      min: 40,
      max: 50,
      backgroundColor: "rgba(255, 99, 132, 0.75)",
    },
    {
      level: "50~60",
      min: 50,
      max: 60,
      backgroundColor: "rgba(75, 192, 192, 0.75)",
    },
    {
      level: "60~70",
      min: 60,
      max: 70,
      backgroundColor: "rgba(255, 206, 86, 0.75)",
    },
    {
      level: "70~",
      min: 70,
      max: 100,
      backgroundColor: "rgba(153, 102, 255, 0.75)",
    },
  ];

  function reset() {
    for (const element of document.getElementsByName("selectSubject")) {
      element.selectedIndex = false;
    }
    for (const element of document.getElementsByName("selectLabel")) {
      element.selectedIndex = false;
    }
  }

  useEffect(() => {
    setResults([]);
    for (const element of document.getElementsByName("selectType")) {
      element.checked = false;
    }

    reset();
  }, [yearSelect]);
  const getData = useCallback(
    (type) => {
      //データベースからデータを取得する。
      async function fechData() {
        let yearsDummyArray = [];
        let dummyArray = [];

        if (yearSelect !== "") {
          if (type === "Subject") {
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
            setResults(dummyArray);
          }

          if (type === "PreYear") {
            for (let i = 0; i < 5; i++) {
              if (yearSelects[i]) {
                for (let j = 0; j < dataLabel.length; j++) {
                  await getDocs(
                    collection(db, "全統模試結果", yearSelects[i], dataLabel[j])
                  ).then((snap) => {
                    if (snap.docs.length > 0) {
                      dummyArray = [
                        ...dummyArray,
                        snap.docs.map((dd) => ({
                          ...dd.data(),
                          id: dataLabel[j],
                        })),
                      ];
                    } else {
                      dummyArray = [...dummyArray, ""];
                    }
                  });
                }
              }
              yearsDummyArray.push(dummyArray);
            }
            setResults([...yearsDummyArray]);
          }
        }
      }
      fechData();
    },
    [yearSelect]
  );

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  function selectType(type) {
    setGraphDataArray([]);
    if (type === "Subject") {
      setGraphLabel(labels);
    }
    if (type === "PreYear") {
      setGraphLabel(yearSelects);
    }
    reset();
    setGraphType(type);
    getData(type);
  }

  function updateGraph(test, subject) {
    let dummyArray = [];
    if (graphType === "Subject") {
      for (let i = 0; i < results.length; i++) {
        dummyArray.push([]);
        for (let j = 0; j < results[i].length; j++) {
          if (results[i][j][`${subject}Dev`]) {
            dummyArray[i].push(results[i][j][`${subject}Dev`]);
          }
        }
      }
    }
    if (graphType === "PreYear") {
      for (let i = 0; i < yearSelects.length; i++) {
        dummyArray.push([]);
        if (test && results.length > 0) {
          for (let j = 0; j < results[i][test].length; j++) {
            if (results[i][test][j][`${subject}Dev`]) {
              dummyArray[i].push(results[i][test][j][`${subject}Dev`]);
            }
          }
        }
      }
    }
    let dummyGraphArray = [[], [], [], [], [], []];
    for (let i = 0; i < graphDatas.length; i++) {
      for (let j = 0; j < dummyArray.length; j++) {
        const numFreq = dummyArray[j].filter((number) => {
          return number >= graphDatas[i].min && number < graphDatas[i].max;
        });
        dummyGraphArray[i].push(numFreq.length);
      }
    }
    setGraphDataArray(dummyGraphArray);
  }
  function handleSubject(subject) {
    setSelectSubject(subject);
    updateGraph(testNum, subject);
  }

  function selectTest(test) {
    setTestNum(test);
    updateGraph(test, selectSubject);
  }

  const data = {
    labels: graphLabel,
    datasets: graphDatas.map((graphData, index) => {
      return {
        label: graphData.level,
        data: graphDataArray[index],
        backgroundColor: graphData.backgroundColor,
      };
    }),
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div onChange={(e) => selectType(e.target.value)}>
        <label>
          <input
            type="radio"
            value="Subject"
            name="selectType"
            style={{ marginRight: "3px" }}
          />
          <span>科目</span>
        </label>
        <label>
          <input
            type="radio"
            value="PreYear"
            name="selectType"
            style={{ marginRight: "3px", marginLeft: "20px" }}
          />
          <span>過年度</span>
        </label>
      </div>
      <select
        onChange={(e) => handleSubject(e.target.value)}
        name="selectSubject"
      >
        <option></option>
        {SubjectSets.map((subject) => {
          return (
            <option value={subject.id} key={subject.id}>
              {subject.name}
            </option>
          );
        })}
      </select>
      {graphType === "PreYear" ? (
        <select
          name="selectLabel"
          style={{ marginLeft: "20px" }}
          onChange={(e) => selectTest(e.target.value, selectSubject)}
        >
          <option></option>
          {dataLabel.map((data, index) => {
            return (
              <option key={data} value={index}>
                {data}
              </option>
            );
          })}
        </select>
      ) : (
        ""
      )}
      <Bar height={10} width={25} data={data} options={options} />
    </div>
  );
}

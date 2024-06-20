"use client";
import { db } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import { SubjectSets } from "../datas";
import {
  collection,
  getDocs,
  getDoc,
  get,
  doc,
  getFirestore,
} from "firebase/firestore";
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
import { Line, getElementAtEvent, getElementsAtEvent } from "react-chartjs-2";
import { background } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Invidisual({ nameList, dataLabel, yearSelect }) {
  const [uploads, setUploads] = useState([]);
  const labels = dataLabel;
  const [results, setResults] = useState([]);
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
      setResults(dummyArray);
    }
    fechData();
  }, [yearSelect]);

  function handleResultShow(name) {
    let resultArray = [];
    for (let i = 0; i < dataLabel.length; i++) {
      if (results[i].length > 0) {
        const searchName = results[i].find((result) => result.name === name);
        if (searchName) {
          resultArray = [...resultArray, searchName];
        } else {
          resultArray = [...resultArray, ""];
        }
      } else {
        resultArray = [...resultArray, ""];
      }
      setUploads(resultArray);
    }
  }

  const charRef = useRef();
  function ComentSet(e) {
    const dataIndex = getElementAtEvent(charRef.current, e)[0].index;
    console.log(labels[dataIndex]);
  }

  const graphData = {
    labels: labels,
    datasets: SubjectSets.map((subject) => {
      return {
        label: subject.name,
        data: uploads.map((upload) => upload[`${subject.id}Dev`]),
        borderColor: subject.borderColor,
        backgroundColor: subject.backgroundColor,
      };
    }),
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <select
        // value={selectName}
        onChange={(e) => handleResultShow(e.target.value)}
        name="selectName"
      >
        {nameList.map((name) => {
          return <option key={name}>{name}</option>;
        })}
      </select>
      <Line
        ref={charRef}
        height={10}
        width={25}
        data={graphData}
        id="chart-key"
        // onClick={(e) => ComentSet(e)}
      />
    </div>
  );
}

export default Invidisual;

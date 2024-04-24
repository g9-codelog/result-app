"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { Line } from "react-chartjs-2";
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

export default function SubjectAveCopy({ nameList, dataLabel, yearSelect }) {
  const labels = dataLabel;

  const SubjectColor = {
    EnBorder: "rgb(90, 90, 90)",
    EnBackground: "rgba(90, 90, 90, 0.2)",
    MtBorder: "rgb(75, 100, 192)",
    MtBackground: "rgba(75, 100, 192, 0.2)",
    JaBorder: "rgb(255, 99, 132)",
    JaBackground: "rgba(255, 99, 132, 0.2)",
    SiBorder: "rgb(75, 192, 192)",
    SiBackground: "rgba(75, 192, 192, 0.2)",
    SoBorder: "rgb(255, 206, 86)",
    SoBackground: "rgba(255, 206, 86, 0.2)",
    InBorder: "rgb(153, 102, 255)",
    InBackground: "rgba(153, 102, 255, 0.2)",
    ComBorder: "rgb(255, 159, 64)",
    ComBackground: "rgba(255, 159, 64, 0.2)",
  };

  const SubjectSets = [
    {
      name: "英語",
      id: "En",
      borderColor: SubjectColor.EnBorder,
      backgroundColor: SubjectColor.EnBackground,
    },
    {
      name: "数学",
      id: "Mt",
      borderColor: SubjectColor.MtBorder,
      backgroundColor: SubjectColor.MtBackground,
    },
    {
      name: "数学１",
      id: "Mt1",
      borderColor: SubjectColor.MtBorder,
      backgroundColor: SubjectColor.MtBackground,
    },
    {
      name: "数学２",
      id: "Mt2",
      borderColor: SubjectColor.MtBorder,
      backgroundColor: SubjectColor.MtBackground,
    },
    {
      name: "国語",
      id: "ja",
      borderColor: SubjectColor.JaBorder,
      backgroundColor: SubjectColor.JaBackground,
    },
    {
      name: "現代文",
      id: "NJa",
      borderColor: SubjectColor.JaBorder,
      backgroundColor: SubjectColor.JaBackground,
    },
    {
      name: "古文",
      id: "An",
      borderColor: SubjectColor.JaBorder,
      backgroundColor: SubjectColor.JaBackground,
    },
    {
      name: "漢文",
      id: "CJa",
      borderColor: SubjectColor.JaBorder,
      backgroundColor: SubjectColor.JaBackground,
    },
    {
      name: "現古",
      id: "AJa",
      borderColor: SubjectColor.JaBorder,
      backgroundColor: SubjectColor.JaBackground,
    },
    {
      name: "物理",
      id: "Ph",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "化学",
      id: "Ch",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "生物",
      id: "Bi",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "物理基礎",
      id: "BPh",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "化学基礎",
      id: "BCh",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "生物基礎",
      id: "BBi",
      borderColor: SubjectColor.SiBorder,
      backgroundColor: SubjectColor.SiBackground,
    },
    {
      name: "世界史",
      id: "WH",
      borderColor: SubjectColor.SoBorder,
      backgroundColor: SubjectColor.SoBackground,
    },
    {
      name: "日本史",
      id: "JH",
      borderColor: SubjectColor.SoBorder,
      backgroundColor: SubjectColor.SoBackground,
    },
    {
      name: "政治経済",
      id: "PE",
      borderColor: SubjectColor.SoBorder,
      backgroundColor: SubjectColor.SoBackground,
    },
    {
      name: "地理",
      id: "Ge",
      borderColor: SubjectColor.SoBorder,
      backgroundColor: SubjectColor.SoBackground,
    },
    {
      name: "倫理",
      id: "Et",
      borderColor: SubjectColor.SoBorder,
      backgroundColor: SubjectColor.SoBackground,
    },
    {
      name: "情報",
      id: "In",
      borderColor: SubjectColor.InBorder,
      backgroundColor: SubjectColor.InBackground,
    },
    {
      name: "総合1",
      id: "Com1",
      borderColor: SubjectColor.ComBorder,
      backgroundColor: SubjectColor.ComBackground,
    },
    {
      name: "総合2",
      id: "Com2",
      borderColor: SubjectColor.ComBorder,
      backgroundColor: SubjectColor.ComBackground,
    },
    {
      name: "英数",
      id: "EnMt",
      borderColor: SubjectColor.ComBorder,
      backgroundColor: SubjectColor.ComBackground,
    },
    {
      name: "英国",
      id: "EnJa",
      borderColor: SubjectColor.ComBorder,
      backgroundColor: SubjectColor.ComBackground,
    },
  ];

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
    <div>
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

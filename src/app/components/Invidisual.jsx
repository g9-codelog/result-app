"use client";
import { db } from "../../firebase";
import { useEffect, useState, useRef } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Sample({ nameList, dataLabel, yearSelect }) {
  const [uploads, setUploads] = useState([]);
  const labels = dataLabel;
  const [selectName, setSelectName] = useState("");

  useEffect(() => {
    let dummyArray = [];
    //データベースからデータを取得する。
    if (yearSelect === "") {
      return;
    } else {
      for (let i = 0; i < dataLabel.length; i++) {
        getDocs(collection(db, yearSelect, dataLabel[i], `${selectName}`)).then(
          (snap) => {
            if (snap.docs.length > 0) {
              dummyArray = [
                ...dummyArray,
                ...snap.docs.map((dd) => ({ ...dd.data(), id: dd.id })),
              ];
            } else {
              dummyArray = [...dummyArray, ""];
            }
            setUploads(dummyArray);
          }
        );
      }
    }
  }, [selectName]);

  const charRef = useRef();
  function ComentSet(e) {
    const dataIndex = getElementAtEvent(charRef.current, e)[0].index;
    console.log(labels[dataIndex]);
  }

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "英語",
        data: uploads.map((upload) => upload.EnDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "数学",
        data: uploads.map((upload) => upload.MtDev),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "数学1",
        data: uploads.map((upload) => upload.Mt1Dev),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "数学2",
        data: uploads.map((upload) => upload.Mt2Dev),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "国語",
        data: uploads.map((upload) => upload.JaDev),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "現代文",
        data: uploads.map((upload) => upload.NJaDev),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "古文",
        data: uploads.map((upload) => upload.AnDev),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "漢文",
        data: uploads.map((upload) => upload.CJaDev),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "現古",
        data: uploads.map((upload) => upload.AJaDev),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "物理",
        data: uploads.map((upload) => upload.PhDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "化学",
        data: uploads.map((upload) => upload.ChDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "生物",
        data: uploads.map((upload) => upload.BiDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "物理基礎",
        data: uploads.map((upload) => upload.BPhDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "化学基礎",
        data: uploads.map((upload) => upload.BChDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "生物基礎",
        data: uploads.map((upload) => upload.BBiDev),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "世界史",
        data: uploads.map((upload) => upload.WHDev),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "日本史",
        data: uploads.map((upload) => upload.JHDev),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "政治経済",
        data: uploads.map((upload) => upload.PEDev),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "地理",
        data: uploads.map((upload) => upload.GeDev),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "倫理",
        data: uploads.map((upload) => upload.EtDev),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "情報",
        data: uploads.map((upload) => upload.InDev),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
      {
        label: "総合1",
        data: uploads.map((upload) => upload.Com1Dev),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "総合2",
        data: uploads.map((upload) => upload.Com2Dev),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "英数",
        data: uploads.map((upload) => upload.EnMtDev),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "英国",
        data: uploads.map((upload) => upload.EnJaDev),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };

  return (
    <div>
      <select
        value={selectName}
        onChange={(e) => setSelectName(e.target.value)}
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

export default Sample;

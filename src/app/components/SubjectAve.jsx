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
  const [EnAve, setEnAve] = useState([]);
  const [MtAve, setMtAve] = useState([]);
  const [Mt1Ave, setMt1Ave] = useState([]);
  const [Mt2Ave, setMt2Ave] = useState([]);
  const [JaAve, setJaAve] = useState([]);
  const [NJaAve, setNJaAve] = useState([]);
  const [AnAve, setAnAve] = useState([]);
  const [CJaAve, setCJaAve] = useState([]);
  const [AJaAve, setAJaAve] = useState([]);
  const [PhAve, setPhAve] = useState([]);
  const [ChAve, setChAve] = useState([]);
  const [BiAve, setBiAve] = useState([]);
  const [BPhAve, setBPhAve] = useState([]);
  const [BChAve, setBChAve] = useState([]);
  const [BBiAve, setBBiAve] = useState([]);
  const [WHAve, setWHAve] = useState([]);
  const [JHAve, setJHAve] = useState([]);
  const [PEAve, setPEAve] = useState([]);
  const [GeAve, setGeAve] = useState([]);
  const [EtAve, setEtAve] = useState([]);
  const [InAve, setInAve] = useState([]);
  const [Com1Ave, setCom1Ave] = useState([]);
  const [Com2Ave, setCom2Ave] = useState([]);
  const [EnMtAve, setEnMtAve] = useState([]);
  const [EnJaAve, setEnJaAve] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const EnAveArray = [];
      const MtAveArray = [];
      const Mt1AveArray = [];
      const Mt2AveArray = [];
      const JaAveArray = [];
      const NJaAveArray = [];
      const AnAveArray = [];
      const CJaAveArray = [];
      const AJaAveArray = [];
      const PhAveArray = [];
      const ChAveArray = [];
      const BiAveArray = [];
      const BPhAveArray = [];
      const BChAveArray = [];
      const BBiAveArray = [];
      const WHAveArray = [];
      const JHAveArray = [];
      const PEAveArray = [];
      const GeAveArray = [];
      const EtAveArray = [];
      const InAveArray = [];
      const Com1AveArray = [];
      const Com2AveArray = [];
      const EnMtAveArray = [];
      const EnJaAveArray = [];

      for (let i = 0; i < labels.length; i++) {
        if (yearSelect === "") {
          return;
        } else {
          let EndummyArray = [];
          let MtdummyArray = [];
          let Mt1dummyArray = [];
          let Mt2dummyArray = [];
          let JadummyArray = [];
          let NJadummyArray = [];
          let AndummyArray = [];
          let CJadummyArray = [];
          let AJadummyArray = [];
          let PhdummyArray = [];
          let ChdummyArray = [];
          let BidummyArray = [];
          let BPhdummyArray = [];
          let BChdummyArray = [];
          let BBidummyArray = [];
          let WHdummyArray = [];
          let JHdummyArray = [];
          let PEdummyArray = [];
          let GedummyArray = [];
          let EtdummyArray = [];
          let IndummyArray = [];
          let Com1dummyArray = [];
          let Com2dummyArray = [];
          let EnMtdummyArray = [];
          let EnJadummyArray = [];

          for (let j = 0; j < nameList.length; j++) {
            const snapshot = await getDocs(
              collection(db, yearSelect, dataLabel[i], `${nameList[j]}`)
            );
            const ex = snapshot.docs.map((dd) => ({ ...dd.data() }));
            if (snapshot.docs.length > 0 && ex[0].EnDev) {
              EndummyArray = [...EndummyArray, ex[0].EnDev];
            }
            if (snapshot.docs.length > 0 && ex[0].MtDev) {
              MtdummyArray = [...MtdummyArray, ex[0].MtDev];
            }
            if (snapshot.docs.length > 0 && ex[0].Mt1Dev) {
              Mt1dummyArray = [...Mt1dummyArray, ex[0].Mt1Dev];
            }
            if (snapshot.docs.length > 0 && ex[0].Mt2Dev) {
              Mt2dummyArray = [...Mt2dummyArray, ex[0].Mt2Dev];
            }
            if (snapshot.docs.length > 0 && ex[0].JaDev) {
              JadummyArray = [...JadummyArray, ex[0].JaDev];
            }
            if (snapshot.docs.length > 0 && ex[0].NJaDev) {
              NJadummyArray = [...NJadummyArray, ex[0].NJaDev];
            }
            if (snapshot.docs.length > 0 && ex[0].AnDev) {
              AndummyArray = [...AndummyArray, ex[0].AnDev];
            }
            if (snapshot.docs.length > 0 && ex[0].CJaDev) {
              CJadummyArray = [...CJadummyArray, ex[0].CJaDev];
            }
            if (snapshot.docs.length > 0 && ex[0].AJaDev) {
              AJadummyArray = [...AJadummyArray, ex[0].AJaDev];
            }
            if (snapshot.docs.length > 0 && ex[0].PhDev) {
              PhdummyArray = [...PhdummyArray, ex[0].PhDev];
            }
            if (snapshot.docs.length > 0 && ex[0].ChDev) {
              ChdummyArray = [...ChdummyArray, ex[0].ChDev];
            }
            if (snapshot.docs.length > 0 && ex[0].BiDev) {
              BidummyArray = [...BidummyArray, ex[0].BiDev];
            }
            if (snapshot.docs.length > 0 && ex[0].BPhDev) {
              BPhdummyArray = [...BPhdummyArray, ex[0].BPhDev];
            }
            if (snapshot.docs.length > 0 && ex[0].BChDev) {
              BChdummyArray = [...BChdummyArray, ex[0].BChDev];
            }
            if (snapshot.docs.length > 0 && ex[0].BBiDev) {
              BBidummyArray = [...BBidummyArray, ex[0].BBiDev];
            }
            if (snapshot.docs.length > 0 && ex[0].WHDev) {
              WHdummyArray = [...WHdummyArray, ex[0].WHDev];
            }
            if (snapshot.docs.length > 0 && ex[0].JHDev) {
              JHdummyArray = [...JHdummyArray, ex[0].JHDev];
            }
            if (snapshot.docs.length > 0 && ex[0].PEDev) {
              PEdummyArray = [...PEdummyArray, ex[0].PEDev];
            }
            if (snapshot.docs.length > 0 && ex[0].GeDev) {
              GedummyArray = [...GedummyArray, ex[0].GeDev];
            }
            if (snapshot.docs.length > 0 && ex[0].EtDev) {
              EtdummyArray = [...EtdummyArray, ex[0].EtDev];
            }
            if (snapshot.docs.length > 0 && ex[0].InDev) {
              IndummyArray = [...IndummyArray, ex[0].InDev];
            }
            if (snapshot.docs.length > 0 && ex[0].Com1Dev) {
              Com1dummyArray = [...Com1dummyArray, ex[0].Com1Dev];
            }
            if (snapshot.docs.length > 0 && ex[0].Com2Dev) {
              Com2dummyArray = [...Com2dummyArray, ex[0].Com2Dev];
            }
            if (snapshot.docs.length > 0 && ex[0].EnMtDev) {
              EnMtdummyArray = [...EnMtdummyArray, ex[0].EnMtDev];
            }
            if (snapshot.docs.length > 0 && ex[0].EnJaDev) {
              EnJadummyArray = [...EnJadummyArray, ex[0].EnJaDev];
            }
          }
          const EnsumData = EndummyArray.reduce(
            (acc, En) => acc + Number(En),
            0
          );
          const EnAve = EnsumData / EndummyArray.length;
          EnAveArray.push({ Ave: EnAve, id: dataLabel[i] });

          const MtsumData = MtdummyArray.reduce(
            (acc, Mt) => acc + Number(Mt),
            0
          );
          const MtAve = MtsumData / MtdummyArray.length;
          MtAveArray.push({ Ave: MtAve, id: dataLabel[i] });

          const Mt1sumData = Mt1dummyArray.reduce(
            (acc, Mt1) => acc + Number(Mt1),
            0
          );
          const Mt1Ave = Mt1sumData / Mt1dummyArray.length;
          Mt1AveArray.push({ Ave: Mt1Ave, id: dataLabel[i] });

          const Mt2sumData = Mt2dummyArray.reduce(
            (acc, Mt2) => acc + Number(Mt2),
            0
          );
          const Mt2Ave = Mt2sumData / Mt2dummyArray.length;
          Mt2AveArray.push({ Ave: Mt2Ave, id: dataLabel[i] });

          const JasumData = JadummyArray.reduce(
            (acc, Ja) => acc + Number(Ja),
            0
          );
          const JaAve = JasumData / JadummyArray.length;
          JaAveArray.push({ Ave: JaAve, id: dataLabel[i] });

          const NJasumData = NJadummyArray.reduce(
            (acc, NJa) => acc + Number(NJa),
            0
          );
          const NJaAve = NJasumData / NJadummyArray.length;
          NJaAveArray.push({ Ave: NJaAve, id: dataLabel[i] });

          const AnsumData = AndummyArray.reduce(
            (acc, An) => acc + Number(An),
            0
          );
          const AnAve = AnsumData / AndummyArray.length;
          AnAveArray.push({ Ave: AnAve, id: dataLabel[i] });

          const CJasumData = CJadummyArray.reduce(
            (acc, CJa) => acc + Number(CJa),
            0
          );
          const CJaAve = CJasumData / CJadummyArray.length;
          CJaAveArray.push({ Ave: CJaAve, id: dataLabel[i] });

          const AJasumData = AJadummyArray.reduce(
            (acc, AJa) => acc + Number(AJa),
            0
          );
          const AJaAve = AJasumData / AJadummyArray.length;
          AJaAveArray.push({ Ave: AJaAve, id: dataLabel[i] });

          const PhsumData = PhdummyArray.reduce(
            (acc, Ph) => acc + Number(Ph),
            0
          );
          const PhAve = PhsumData / PhdummyArray.length;
          PhAveArray.push({ Ave: PhAve, id: dataLabel[i] });

          const ChsumData = ChdummyArray.reduce(
            (acc, Ch) => acc + Number(Ch),
            0
          );
          const ChAve = ChsumData / ChdummyArray.length;
          ChAveArray.push({ Ave: ChAve, id: dataLabel[i] });

          const BisumData = BidummyArray.reduce(
            (acc, Bi) => acc + Number(Bi),
            0
          );
          const BiAve = BisumData / BidummyArray.length;
          BiAveArray.push({ Ave: BiAve, id: dataLabel[i] });

          const BPhsumData = BPhdummyArray.reduce(
            (acc, BPh) => acc + Number(BPh),
            0
          );
          const BPhAve = BPhsumData / BPhdummyArray.length;
          BPhAveArray.push({ Ave: BPhAve, id: dataLabel[i] });

          const BChsumData = BChdummyArray.reduce(
            (acc, BCh) => acc + Number(BCh),
            0
          );
          const BChAve = BChsumData / BChdummyArray.length;
          BChAveArray.push({ Ave: BChAve, id: dataLabel[i] });

          const BBisumData = BBidummyArray.reduce(
            (acc, BBi) => acc + Number(BBi),
            0
          );
          const BBiAve = BBisumData / BBidummyArray.length;
          BBiAveArray.push({ Ave: BBiAve, id: dataLabel[i] });

          const WHsumData = WHdummyArray.reduce(
            (acc, WH) => acc + Number(WH),
            0
          );
          const WHAve = WHsumData / WHdummyArray.length;
          WHAveArray.push({ Ave: WHAve, id: dataLabel[i] });

          const JHsumData = JHdummyArray.reduce(
            (acc, JH) => acc + Number(JH),
            0
          );
          const JHAve = JHsumData / JHdummyArray.length;
          JHAveArray.push({ Ave: JHAve, id: dataLabel[i] });

          const PEsumData = PEdummyArray.reduce(
            (acc, PE) => acc + Number(PE),
            0
          );
          const PEAve = PEsumData / PEdummyArray.length;
          PEAveArray.push({ Ave: PEAve, id: dataLabel[i] });

          const GesumData = GedummyArray.reduce(
            (acc, Ge) => acc + Number(Ge),
            0
          );
          const GeAve = GesumData / GedummyArray.length;
          GeAveArray.push({ Ave: GeAve, id: dataLabel[i] });

          const EtsumData = EtdummyArray.reduce(
            (acc, Et) => acc + Number(Et),
            0
          );
          const EtAve = EtsumData / EtdummyArray.length;
          EtAveArray.push({ Ave: EtAve, id: dataLabel[i] });

          const InsumData = IndummyArray.reduce(
            (acc, In) => acc + Number(In),
            0
          );
          const InAve = InsumData / IndummyArray.length;
          InAveArray.push({ Ave: InAve, id: dataLabel[i] });

          const Com1sumData = Com1dummyArray.reduce(
            (acc, Com1) => acc + Number(Com1),
            0
          );
          const Com1Ave = Com1sumData / Com1dummyArray.length;
          Com1AveArray.push({ Ave: Com1Ave, id: dataLabel[i] });

          const Com2sumData = Com2dummyArray.reduce(
            (acc, Com2) => acc + Number(Com2),
            0
          );
          const Com2Ave = Com2sumData / Com2dummyArray.length;
          Com2AveArray.push({ Ave: Com2Ave, id: dataLabel[i] });

          const EnMtsumData = EnMtdummyArray.reduce(
            (acc, EnMt) => acc + Number(EnMt),
            0
          );
          const EnMtAve = EnMtsumData / EnMtdummyArray.length;
          EnMtAveArray.push({ Ave: EnMtAve, id: dataLabel[i] });

          const EnJasumData = EnJadummyArray.reduce(
            (acc, EnJa) => acc + Number(EnJa),
            0
          );
          const EnJaAve = EnJasumData / EnJadummyArray.length;
          EnJaAveArray.push({ Ave: EnJaAve, id: dataLabel[i] });
        }
      }
      setEnAve(EnAveArray);
      setMtAve(MtAveArray);
      setMt1Ave(Mt1AveArray);
      setMt2Ave(Mt2AveArray);
      setJaAve(JaAveArray);
      setNJaAve(NJaAveArray);
      setAnAve(AnAveArray);
      setCJaAve(CJaAveArray);
      setAJaAve(AJaAveArray);
      setPhAve(PhAveArray);
      setChAve(ChAveArray);
      setBiAve(BiAveArray);
      setBPhAve(BPhAveArray);
      setBChAve(BChAveArray);
      setBBiAve(BBiAveArray);
      setWHAve(WHAveArray);
      setJHAve(JHAveArray);
      setPEAve(PEAveArray);
      setGeAve(GeAveArray);
      setEtAve(EtAveArray);
      setInAve(InAveArray);
      setCom1Ave(Com1AveArray);
      setCom2Ave(Com2AveArray);
      setEnMtAve(EnMtAveArray);
      setEnJaAve(EnJaAveArray);
    };

    fetchData();
  }, [nameList]);

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "英語",
        data: EnAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "数学",
        data: MtAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "数学1",
        data: Mt1Ave.map((upload) => upload.Ave),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "数学2",
        data: Mt2Ave.map((upload) => upload.Ave),
        borderColor: "rgb(75, 100, 192)",
        backgroundColor: "rgba(5, 100, 192, 0.2)",
      },
      {
        label: "国語",
        data: JaAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "現代文",
        data: NJaAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "古文",
        data: AnAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "漢文",
        data: CJaAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "現古",
        data: AJaAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "物理",
        data: PhAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "化学",
        data: ChAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "生物",
        data: BiAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "物理基礎",
        data: BPhAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "化学基礎",
        data: BChAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "生物基礎",
        data: BBiAve.map((upload) => upload.Ave),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(5, 192, 192, 0.2)",
      },
      {
        label: "世界史",
        data: WHAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "日本史",
        data: JHAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "政治経済",
        data: PEAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "地理",
        data: GeAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "倫理",
        data: EtAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "情報",
        data: InAve.map((upload) => upload.Ave),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
      {
        label: "総合1",
        data: Com1Ave.map((upload) => upload.Ave),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "総合2",
        data: Com2Ave.map((upload) => upload.Ave),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "英数",
        data: EnMtAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "英国",
        data: EnJaAve.map((upload) => upload.Ave),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
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

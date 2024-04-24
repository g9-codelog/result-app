import CsvImport from "../components/CsvImport";
import styles from "../page.module.css";

export default function Home() {
  let dataLabels = [
    "第1回高2",
    "第2回高2",
    "第3回高2",
    "全統記述",
    "全統共テ",
    "高3第1回共テ",
    "高3第1回記述",
    "高3第2回共テ",
    "高3第2回記述",
    "高3第3回記述",
    "高3第3回共テ",
    "高3全統プレ",
  ];
  return (
    <main className={styles.main}>
      <CsvImport dataLabels={dataLabels} />
    </main>
  );
}

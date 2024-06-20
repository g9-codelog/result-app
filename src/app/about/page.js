import CsvImport from "../components/CsvImport";
import styles from "../page.module.css";
import { dataLabel } from "../datas";

export default function Home() {
  return (
    <main className={styles.main}>
      <CsvImport dataLabels={dataLabel} />
    </main>
  );
}

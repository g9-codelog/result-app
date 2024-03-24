import CsvImport from "../components/CsvImport";
import styles from "../page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <CsvImport />
    </main>
  );
}

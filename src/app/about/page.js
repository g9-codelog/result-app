import { AuthProvider } from "../AuthProvider";
import CsvImport from "../components/CsvImport";
import Header from "../components/Header/Header";
import styles from "../page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <CsvImport />
    </main>
  );
}

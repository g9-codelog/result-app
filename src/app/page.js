import styles from "./page.module.css";
import DataBox from "./components/DataBox";
import Header from "./components/Header";
import { AuthProvider } from "../app/AuthProvider";

export default function Home() {
  return (
    <main className={styles.main}>
      <AuthProvider>
        <Header></Header>
        <DataBox></DataBox>
      </AuthProvider>
    </main>
  );
}

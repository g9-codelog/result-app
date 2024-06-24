import React from "react";
import styles from "../page.module.css";

import ResetPass from "../components/ResetPass/ResetPass";

export default function page() {
  return (
    <div className={styles.main}>
      <ResetPass />
    </div>
  );
}

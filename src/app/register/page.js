import React from "react";
import styles from "../page.module.css";

import Register from "../components/Register/Register";

export default function page() {
  return (
    <div className={styles.main}>
      <Register></Register>
    </div>
  );
}

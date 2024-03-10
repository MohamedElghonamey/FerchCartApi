import React from "react";
import styles from "./Loading.css";
export default function Loading() {
  return (
    <section className="text-center vh-100 w-100 d-flex justify-content-center align-items-center bg-black  ">
      <div className={styles.loader}></div>
    </section>
  );
}

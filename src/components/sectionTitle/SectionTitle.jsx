import React from "react";
import style from "./sectionTitle.module.css";

const SectionTitle = ({ title }) => {
  return (
    <div className={style.titleContainer}>
      <h2 className={style.title}> {title}</h2>
      <div className={style.line}></div>
    </div>
  );
};

export default SectionTitle;

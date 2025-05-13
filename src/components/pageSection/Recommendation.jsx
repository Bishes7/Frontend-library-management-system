import React from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import { CustomCard } from "../customCard/CustomCard";

const Recommendation = () => {
  return (
    <div className="mt-5">
      <SectionTitle title="Recommendation" />
      <div className="d-flex gap-2  justify-content-center flex-wrap">
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </div>
    </div>
  );
};

export default Recommendation;

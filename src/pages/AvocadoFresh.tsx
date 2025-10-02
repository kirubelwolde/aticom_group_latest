
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";

const AvocadoFresh = () => {
  return (
    <DynamicBusinessPage 
      sectorRoute="/avocado-fresh"
      fallbackTitle="ATICADO Fresh Avocado"
      fallbackDescription="Premium Ethiopian avocados cultivated with sustainable farming practices and exported globally to discerning markets"
    />
  );
};

export default AvocadoFresh;

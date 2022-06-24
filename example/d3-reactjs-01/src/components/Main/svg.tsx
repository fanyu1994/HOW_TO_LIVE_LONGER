import * as d3 from "d3";
import { useEffect } from "react";

export default function T1() {
  function changeData() {
    
  }
  useEffect(() => {
    const svg = d3.selectAll(".main_data_01");
  }, []);
  return (
    <div>
      <h1>数据</h1>
      <div className="main_data_01">
        <button onClick={changeData}>点击</button>
      </div>
    </div>
  );
}

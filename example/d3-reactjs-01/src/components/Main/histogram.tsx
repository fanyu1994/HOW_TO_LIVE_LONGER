import * as d3 from "d3";
import { useEffect, useMemo, useState } from "react";

export default function Histogram() {
  const [isSort, setisSort] = useState(3);
  const [data, setData] = useState<any>([]);
  const [len, setlen] = useState<number>(10);
  const colorScheme = d3.interpolateRdBu;
  function change_add() {
    let a = isSort === 1 ? 2 : isSort === 2 ? 3 : 1;
    setisSort((isSort) => a);
    setlen((len) => len + isSort);
   
  }
  function change_reduce() {
    let a = isSort === 1 ? 2 : isSort === 2 ? 3 : 1;
    setisSort((isSort) => a);
    setlen((len) => len - isSort);
   
  }
  useEffect(()=>{
    draw(len);
  },[len])
  function draw(len: number = 10) {
    const config = {
      width: document.body.getBoundingClientRect().width,
      height: 400,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50,
      },
    };
    d3.selectAll("svg").remove();
    const svg = d3
      .select("#histogram")
      .append("svg")
      .attr("width", config.width)
      .attr("height", config.height);
    const list = data
      .map((p: { price: string | number }) => +p.price)
      .slice(0, len) as Array<number>;

    if (isSort === 1) {
      list.sort((a: number, b: number) => a - b);
    } else if (isSort === 2) {
      list.sort((a: number, b: number) => b - a);
    } else {
      list;
    }
    const xScale = d3
      .scaleBand()
      .domain(list.map((d: any, i: any) => i))
      .range([config.margin.left, config.width - config.margin.right]);
    const xAxis = (g: any) =>
      g
        .attr(
          "transform",
          `translate(0,${config.height - config.margin.bottom})`
        )
        .call(d3.axisBottom(xScale).tickSizeOuter(0));
    svg.append("g").call(xAxis);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(list, (d: any) => d)])
      .nice()
      .range([config.height - config.margin.bottom, config.margin.top]);

    const yAxis = (g: any) =>
      g
        .attr("transform", `translate(${config.margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat(d3.format(",")));
    svg.append("g").call(yAxis);

    svg
      .append("g")
      .selectAll("rect")
      .data(list)
      .join("rect")
      .attr("fill", (d, i) => colorScheme(1 - i / 100))
      .attr("x", (_d, i: any) => xScale(i)!)
      .attr("y", (d: any) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d: any, i) => yScale(0) - yScale(d))
      .append("title")
      .text((d, i) => `${list[i]}`);
  }
  useMemo(() => {
    draw();
  }, [data, len]);
  useEffect(() => {
    d3.csv("src/mock/histogram.csv").then((d) => {
      setData(d);
    });
  }, []);
  return (
    <div>
      <h1>
        Histogram -- 直方图
        <button onClick={change_add}>+++</button>
        <button onClick={change_reduce}>---</button>
      </h1>
      <div id="histogram"></div>
    </div>
  );
}

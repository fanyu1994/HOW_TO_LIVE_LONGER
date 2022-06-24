import Svg from "./svg";
import Histogram from "./histogram";

export default function Main() {
  return (
    <div>
      <h1>数据</h1>
      <div id="main_data">
        <Svg />
        <Histogram />
      </div>
    </div>
  );
}

import { useState } from "react";
import * as constants from "node:constants";

function App () {
  const [list, setList] = useState([]);
  const [loAding, setLoading] = useState(true); // 로딩 과정인지 아닌지를 boolean으로 만듬

  if (loading) {
    return <div>데이터를 로드 중입니다...</div>
  }
  return <></>;
}

export default App;
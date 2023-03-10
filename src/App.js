/**
 * @branch use-memo
 * @target when to use useMemo?
 */

/**
 * useMemo is the same as useCallback, more specifically, useCallback is a syntax sugar for useMemo!
 * So, useMemo also works with React.memo, and component should depends on a parent component generated object.
 */

import { memo, useMemo, useState } from "react";

const MemoCalculator = memo((props) => {
  console.log("MemoCalculator render", props.id);
  return (
    <div>
      <div>calculator {props.id}</div>
      <button onClick={props.operation.inc}>Inc</button>
      <button onClick={props.operation.dec}>Dec</button>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);

  const operation = {
    inc: () => setCount((val) => val + 1),
    dec: () => setCount((val) => val - 1),
  };

  const memoOperaion = useMemo(() => {
    return {
      inc: () => setCount((val) => val + 1),
      dec: () => setCount((val) => val - 1),
    };
  }, []);

  return (
    <div className="App">
      <h2>{count}</h2>
      {/* re-render */}
      <MemoCalculator operation={operation} id="1"></MemoCalculator>
      {/* not re-render */}
      <MemoCalculator operation={memoOperaion} id="2"></MemoCalculator>
    </div>
  );
}

export default App;

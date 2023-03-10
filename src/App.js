/**
 * @branch function-component
 * @target whether function component re-execute when re-render?
 * @target when should use useCallback and useMemo to reduce extra cost?
 */

import { useState } from "react";

function App() {
  // execute every time when click `Add` button
  console.log("App() re-execute");

  // generated object change when rerender
  {
    const obj = { a: 1 };
    // will log `false`
    if (window.globalObjects.length)
      console.log(
        "object same as last render?",
        obj === window.globalObjects.at(-1)
      );
    window.globalObjects.push(obj);
  }

  // generated function change when rerender
  {
    const func = () => {
      console.log("func");
    };
    // will log `false`
    if (window.globalFunctions.length)
      console.log(
        "function same as last render?",
        func === window.globalFunctions.at(-1)
      );
    window.globalFunctions.push(func);
  }

  // same as func
  {
    function func2() {
      console.log("func2");
    }
    if (window.globalFunctions2.length)
      console.log(
        "function2 same as last render?",
        func2 === window.globalFunctions2.at(-1)
      );
    window.globalFunctions2.push(func2);
  }

  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </div>
  );
}

window.globalObjects = [];
window.globalFunctions = [];
window.globalFunctions2 = [];

export default App;

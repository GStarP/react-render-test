/**
 * @branch pass-jsx-element
 * @target when pass jsx element, will useMemo work?
 */

/**
 * Pass JSX.Element, such as props.children, is the same as pass object.
 * So useMemo also works!
 */

import { memo, useMemo, useState } from "react";

const MemoChildComponent = memo((props) => {
  console.log("MemoChildComponent render", props.id);
  return (
    <div>
      <div>Child Component {props.id}</div>
      {props.children}
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>{count}</h2>
      {/* re-render */}
      <MemoChildComponent id="1">
        <div>element</div>
      </MemoChildComponent>
      {/* not re-render */}
      <MemoChildComponent id="2">
        {useMemo(
          () => (
            <div>memo element</div>
          ),
          []
        )}
      </MemoChildComponent>
      <button onClick={() => setCount((val) => val + 1)}>Add</button>
    </div>
  );
}

export default App;

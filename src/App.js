/**
 * @branch use-callback
 * @target when to use useCallback? how it improves performance?
 */

/**
 * We must remember, useCallback only works with React.memo!
 * Because useCallback improves performance by reduce unneeded render.
 * So first, component must be able to refuse common render => React.memo.
 * Then, component should depend on a function, so function change => component re-render.
 * Last, function should be declared in parent component, so it will be re-declared when
 * parent component re-render. If function is static, no need to use useCallback.
 */

import { memo, useCallback, useState } from "react";

// Component without React.memo (cannot refuse re-render)
const Component = (props) => {
  console.log("Component render", props.id);
  return <button onClick={props.onClick}>Add - Common</button>;
};
// Component with React.memo (can refuse re-render)
const MemoComponent = memo((props) => {
  console.log("MemoComponent render", props.id);
  return <button onClick={props.onClick}>Add - Memo</button>;
});
// static function (reference never changes)
function staticFunc() {
  console.log("static function");
}

function App() {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount((val) => val + 1);
  };
  const memoInc = useCallback(() => {
    setCount((val) => val + 1);
  }, []);

  return (
    <div className="App">
      <h2>{count}</h2>
      {/* re-render */}
      <Component onClick={inc} id="1"></Component>
      <Component onClick={memoInc} id="2"></Component>
      <MemoComponent onClick={inc} id="3"></MemoComponent>
      {/* not re-render */}
      <MemoComponent onClick={memoInc} id="4"></MemoComponent>
      <MemoComponent onClick={staticFunc} id="5"></MemoComponent>
    </div>
  );
}

export default App;

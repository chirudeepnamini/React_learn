import "./App.css";
import { useRef, useState } from "react";
import Trail from "./Components/datadisplay";
// import Trail from "./Components/Trail";
function App() {
  return (
    <div>
      {/* <input class="form-control" ref={dateref} placeholder="yyyy-mm-dd" />
      <button
        type="button"
        class="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log("inside app component", dateref.current.value);
          setGotdate(true);
        }}
      >
        Submit
      </button>{" "} */}
      <Trail url="https://u8mndf.deta.dev/state-data/2021-04-14" />
    </div>
  );
}

export default App;

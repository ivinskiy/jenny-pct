import "./App.css";
import { Map } from "./components/Map/Map";
import { Suspense } from "react";

function App() {
  return (
    <div>
      <h1>Jenny PCT</h1>
      <Suspense fallback={<p>Loading map</p>}>
        <Map />
      </Suspense>
    </div>
  );
}

export default App;

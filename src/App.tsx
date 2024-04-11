import "./App.css";
import { Map } from "./components/Map/Map";
import { Suspense } from "react";

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading map</p>}>
        <Map />
      </Suspense>
    </div>
  );
}

export default App;

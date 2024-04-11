import "./Map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import L from "leaflet";
import pct from "./pct.json";
import { getCoordinates } from "../../utils/getCoordinates";

/**
 * Här finns massa info om hur kartan fungerar: https://react-leaflet.js.org/docs/api-map/
 */

export const Map = () => {
  const data = getCoordinates(); // Hämta data
  const allCoords = data.map((dataPoint) => dataPoint.coordinates); // Extrahera koordinater
  const bounds = L.latLngBounds(allCoords); // Skapa kart-begränsningen för initial zoom
  return (
    <MapContainer
      bounds={bounds}
      //boundsOptions={{ padding: [0, 50] }}
      center={data[0].coordinates}
      //scrollWheelZoom={false}
      className="fullscreen-map" // Add a class for CSS styling
      //style={{ height: "500px", width: "800px" }} // Behövs för att kartan ska synas
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.thunderforest.com/outdoors/">Thunderforest Outdoors</a>'
        url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ba12cc41648e4ba9a9c4bd0a441c7250"
      />
      {data.map((dataPoint, index) => (
        <Marker position={dataPoint.coordinates} key={index}>
          <Popup>
            <p>{dataPoint.startOrEnd}</p>
            <p>AU date: {dataPoint.dateAndTimeAU.date.toDateString()}</p>
            <p>AU time: {dataPoint.dateAndTimeAU.time}</p>
            <p>US date: {dataPoint.dateAndTimeUS.date.toDateString()}</p>
            <p>US time: {dataPoint.dateAndTimeUS.time}</p>
            <p>{`Elevation: ${dataPoint.elevation}`}</p>
            <p>{`Increase: ${dataPoint.increase}`}</p>
            <p>{`Decrease: ${dataPoint.decrease}`}</p>
            <p>{`Distance Google: ${dataPoint.distanceGoogle}`}</p>
            <p>{`Distance left: ${dataPoint.distanceLeft}`}</p>
            <p>{`Percent walked: ${dataPoint.percentWalked}`}</p>
          </Popup>
        </Marker>
      ))}
      <GeoJSON
        data={pct as GeoJsonObject}
        style={{
          color: "red",
        }}
        onEachFeature={(_, layer) => {
          layer.bindPopup("<div>This is the PCT</div>");
        }}
      />
    </MapContainer>
  );
};

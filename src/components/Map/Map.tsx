import "./Map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import L from "leaflet";
import { getCoordinates } from "../../utils/getCoordinates";

/**
 * Här finns massa info om hur kartan fungerar: https://react-leaflet.js.org/docs/api-map/
 */

export const Map = () => {
  const data = getCoordinates(); // Hämta data
  const allCoords = data.map((dataPoint) => dataPoint.coordinates); // Extrahera koordinater
  const bounds = L.latLngBounds(allCoords); // Skapa kart-begränsningen för initial zoom
  const generateCustomIcon = (dataPoint: {
    startOrEnd?: "Start" | "End";
    dateAndTimeAU: any;
    dateAndTimeUS?: { date: Date; time: string };
    elevation?: Number;
    coordinates?: {
      lat: number;
      lng: number;
    };
    increase?: Number;
    decrease?: Number;
    distanceGoogle?: Number;
    distanceLeft?: Number;
    percentWalked?: Number;
  }) => {
    return divIcon({
      html: `<div class="marker-label">${dataPoint.dateAndTimeAU.date.toLocaleDateString(
        "sv-SE",
        { month: "short", day: "2-digit" }
      )}</div>`,
      iconSize: [250, 36],
      iconAnchor: [-20, 30],
      className: "custom-marker-label",
    });
  };

  // UNDER FINNS KOD SOM KLIPPER PCT-linjen
  // FUNKAR MEN SER INTE ASSNYGGT UT

  // const test = pct.features[0].geometry.coordinates.filter((coordinate) => {
  //   if (bounds.contains({ lat: coordinate[1], lng: coordinate[0] })) {
  //     return true;
  //   }
  // });
  // pct.features[0].geometry.coordinates = test;

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
            <p>{`Walked today: ${dataPoint.distanceGoogle} km`}</p>
            <p>{`Altitude: ${dataPoint.elevation} m`}</p>
            <p>{`Ascent : ${dataPoint.increase} m`}</p>
            <p>{`Descent : ${dataPoint.decrease} m`}</p>
            <p>{`Distance left: ${dataPoint.distanceLeft} km`}</p>
            <p>{`Percent walked: ${dataPoint.percentWalked.toFixed(2)}%`}</p>
          </Popup>
        </Marker>
      ))}
      {data.map((dataPoint, index) => (
        <Marker
          position={dataPoint.coordinates}
          icon={generateCustomIcon(dataPoint)}
          key={index}
        ></Marker>
      ))}
      {/* <GeoJSON
        data={pct as GeoJsonObject}
        style={{
          color: "red",
        }}
        onEachFeature={(_, layer) => {
          layer.bindPopup("<div>This is the PCT</div>");
        }}
      /> */}
    </MapContainer>
  );
};

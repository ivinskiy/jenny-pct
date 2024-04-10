import { suspend } from "suspend-react";

type ResultsType = [
  "Start" | "End", // Start / End
  Date, // Date AU
  Date, // Time AU
  Date, // Date US
  Date, // Time US
  Number, // Elevation
  String, // Latitute
  String, // Longitude
  Number, // Höjning
  Number, // Sänkning
  Number, // Distance Google
  Number, // Distance left
  Number // Percent walked
];

export const getCoordinates = () => {
  const data = suspend(async () => {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbzrbumXMvwbuLj37_rav1VUilsAC14ys87qqYFWh0Bni-kydYnCO-0mQdY_ugWAiN1I/exec"
    );
    const resultsArray: { data: ResultsType[] } = await res.json();
    // First row is all column names, remove

    resultsArray.data.shift();
    const results = resultsArray.data.map((resultRow) => ({
      startOrEnd: resultRow[0],
      dateAndTimeAU: {
        date: new Date(resultRow[1]),
        time: new Date(resultRow[2]).toLocaleTimeString(),
      },
      dateAndTimeUS: {
        date: new Date(resultRow[3]),
        time: new Date(resultRow[4]).toLocaleTimeString(),
      },
      elevation: resultRow[5],
      coordinates: {
        lat: Number(resultRow[6]),
        lng: Number(resultRow[7]),
      },
      increase: resultRow[8],
      decrease: resultRow[9],
      distanceGoogle: resultRow[10],
      distanceLeft: resultRow[11],
      percentWalked: resultRow[12],
    }));
    return results;
  }, []);

  return data;
};

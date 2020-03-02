const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const attributesToObject = require('./attributes-to-object').attributesToObject;

// Flight data
const dom = new JSDOM(fs.readFileSync('./flighdata_A.xml'), {
  contentType: 'application/xml'
});
const xmlFlights = dom.window.document.querySelectorAll('flights > flight');

const flights = [];
for (let i = 0; i < xmlFlights.length; i++) {
  const attributes = xmlFlights[i].attributes;

  // Attributes
  let flight = { segments: [] };
  flight = { ...flight, ...attributesToObject(attributes) };

  // Segments
  const segments = xmlFlights[i].querySelectorAll('segments segment');
  if (segments) {
    for (let j = 0; j < segments.length; j++) {
      flight = {
        ...flight,
        ...{
          segments: [
            ...flight.segments,
            { ...attributesToObject(segments[j].attributes) }
          ]
        }
      };
    }
  }
  flights.push(flight);
}

// API endpoint
app.get('/get-flight-data/', (req, res) => {
  res.json(flights);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

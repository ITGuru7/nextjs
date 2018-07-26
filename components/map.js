import React from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends React.Component {
  render() {
    const width = this.props.width;
    return (
      <ReactMapGL
        latitude={-21.171}
        longitude={165.808}
        zoom={6.3}
        pitch={0}
        width={width ? width : 700}
        height={width ? width * 1.5 : 800}
        mapStyle="mapbox://styles/roma98/cj4z2tcau0cgx2rrsoisbe2pz"
        mapboxApiAccessToken="pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA"
      />
    );
  }
}

export default Map;

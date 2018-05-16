import React from "react";
import StaticMap from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error
    };
  }

  render() {
    if (!this.state.error) {
      return (
        <StaticMap
          latitude={-21.171}
          longitude={165.808}
          zoom={6.3}
          pitch={0}
          width={439}
          height={400}
          mapStyle="mapbox://styles/roma98/cj4z2tcau0cgx2rrsoisbe2pz"
          mapboxApiAccessToken="pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA"
        />
      );
    } else {
      return <div>MAP ERROR</div>;
    }
  }
}

export default Map;

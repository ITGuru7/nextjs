import React from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: 165.808,
        latitude: -21.171,
        zoom: 6.3,
        pitch: 0
      }
    };
  }

  _onViewportChange(viewport) {
    this.setState({ viewport });
  }

  render() {
    const width = this.props.width;
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={this._onViewportChange.bind(this)}
        attributionControl={false}
        width={width ? width : 700}
        height={width ? width * 1.5 : 800}
        mapStyle="mapbox://styles/roma98/cj4z2tcau0cgx2rrsoisbe2pz"
        mapboxApiAccessToken="pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA"
      />
    );
  }
}

export default Map;

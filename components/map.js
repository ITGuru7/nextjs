import React from "react";
import { StaticMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL, { IconLayer } from "deck.gl";
import IconClusterLayer from "./icon-cluster-layer";
import WebMercatorViewport from "viewport-mercator-project";

const stopPropagation = evt => evt.stopPropagation();

export const INITIAL_VIEW_STATE = {
  longitude: 165.808,
  latitude: -21.171,
  zoom: 6.3,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      hoveredItems: null,
      expanded: false
    };
    this._onHover = this._onHover.bind(this);
    this._onClick = this._onClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._renderhoveredItems = this._renderhoveredItems.bind(this);
  }

  _onHover(info) {
    if (this.state.expanded) {
      return;
    }

    const { x, y, object } = info;
    const z = info.layer.state.z;
    const { showCluster = true } = this.props;

    let hoveredItems = null;

    if (object) {
      if (showCluster) {
        hoveredItems = object.zoomLevels[z].points.sort(
          (m1, m2) => m1.year - m2.year
        );
      } else {
        hoveredItems = [object];
      }
    }

    this.setState({ x, y, hoveredItems, expanded: false });
  }

  _onClick() {
    this.setState({ expanded: true });
  }

  _onPopupLoad(ref) {
    if (ref) {
      // React events are triggered after native events
      ref.addEventListener("wheel", stopPropagation);
    }
  }

  _closePopup() {
    this.setState({ expanded: false, hoveredItems: null });
  }

  _renderhoveredItems() {
    const { x, y, hoveredItems, expanded } = this.state;

    if (!hoveredItems) {
      return null;
    }

    if (expanded) {
      return (
        <div
          className="tooltip interactive"
          ref={this._onPopupLoad}
          style={{ left: x, top: y }}
          onMouseLeave={this._closePopup}
        >
          {hoveredItems.map(({ name }) => {
            return (
              <div key={name}>
                <h5>{name}</h5>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="tooltip" style={{ left: x, top: y }}>
        {hoveredItems.slice(0, 20).map(({ name }) => (
          <div key={name}>
            <h5>{name}</h5>
          </div>
        ))}
      </div>
    );
  }

  _renderLayers() {
    const hits = this.props.hits;
    let DATA_URL = [];
    for (let idx in hits) {
      const hit = hits[idx];
      if (hit.rich) {
        if (
          hit.rich.location &&
          hit.rich.location.latitude &&
          hit.rich.location.longitude
        ) {
          DATA_URL.push({
            coordinates: [
              hit.rich.location.longitude,
              hit.rich.location.latitude
            ],
            name: hit.id.title
          });
        }
        if (hit.rich.address) {
          DATA_URL.push({
            coordinates: [hit.rich.longitude, hit.rich.latitude],
            name: hit.rich.address
          });
        }
      }
    }

    const {
      data = DATA_URL,
      iconMapping = "/static/data/location-icon-mapping.json",
      iconAtlas = "/static/data/location-icon-atlas.png",
      showCluster = true,
      viewState
    } = this.props;

    const layerProps = {
      data,
      pickable: true,
      getPosition: d => d.coordinates,
      iconAtlas,
      iconMapping,
      onHover: this._onHover,
      onClick: this._onClick,
      sizeScale: 60
    };

    const size = viewState
      ? Math.min(Math.pow(1.5, viewState.zoom - 10), 1)
      : 0.1;

    const layer = showCluster
      ? new IconClusterLayer({ ...layerProps, id: "icon-cluster" })
      : new IconLayer({
          ...layerProps,
          id: "icon",
          getIcon: d => "marker",
          getSize: size
        });

    return [layer];
  }

  render() {
    const width = this.props.width ? this.props.width : 700;
    const height = this.props.width ? this.props.width * 1.5 : 700;

    const { viewState, controller = true, baseMap = true } = this.props;



    const viewport = new WebMercatorViewport({ width, height }).fitBounds(
      [[-122.4, 37.7], [-122.5, 37.8]],
      {
        padding: 20,
        offset: [0, -100]
      }
    );

    return (
      <div
        style={{
          width,
          height,
          position: "relative"
        }}
      >
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={viewState}
          controller={controller}
          width={width}
          height={height}
          onViewportChange={v => null}

        >
          {baseMap && (
            <StaticMap
              // gl={true}
              // reuseMaps={true}
              attributionControl={false}
              useDevicePixels={false}
              mapStyle="mapbox://styles/roma98/cj4z2tcau0cgx2rrsoisbe2pz"
              preventStyleDiffing={true}
              mapboxApiAccessToken="pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA"
            />
          )}
          {this._renderhoveredItems}
        </DeckGL>
      </div>
    );
  }
}

export default Map;

import React, { Component } from "react";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import ServicePin from "./ServicePin";
import ServiceInfo from "./ServiceInfo";

const TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapboxMap extends Component {
  state = {
    viewport: {
      latitude: 39.2895,
      longitude: -76.5815,
      zoom: 11,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderCityMarker = ({ properties }) => {
    return (
      <Marker
        key={properties.ID}
        longitude={properties.X}
        latitude={properties.Y}
      >
        <ServicePin
          size={15}
          onClick={() => this.setState({ popupInfo: properties })}
        />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.X}
          latitude={popupInfo.Y}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <ServiceInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {this.props.features.map(this._renderCityMarker)}
        {this._renderPopup()}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </MapGL>
    );
  }
}

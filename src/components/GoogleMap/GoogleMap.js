import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
    width: "100%",
    height: "100%",
    minHeight: '500px'
};

function MapComponent(props) {
    return (
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
                lat: 10.802500,
                lng: 106.696625
            }}
        />
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyArI8rzgh1O1Wt64BT3yjLexUr-zzaJ8rk",
})(MapComponent);

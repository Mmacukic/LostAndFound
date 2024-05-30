import React from "react";
import GoogleMapReact from 'google-map-react';
import {Badge} from "reactstrap";
import {StreetViewService} from "@react-google-maps/api";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
    const props = {
        center: {
            lat: 45.815399,
            lng: 	15.966568
        },
        zoom: 12
    };
    const handleApiLoaded = (map, maps) => {
        
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBE-Qgk9Herrtm1fk_xfC2m7ryvEMLY_zA" }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                options={{
                    
                }}
            >
                <AnyReactComponent
                    lat={45.815399}
                    lng={15.966568}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}
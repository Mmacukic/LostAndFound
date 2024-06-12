import React, { Component, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pinIcon from '../icons/pin_249680.png'; // Adjust the path to your icon

// Custom icon
const customIcon = new L.Icon({
    iconUrl: pinIcon,
    iconSize: [38, 38], // Adjust the size as needed
});

// Functional component for the location marker
const LocationMarker = ({ onLocationChange }) => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    const updatePosition = (event) => {
        console.log("Updating position...");
        const marker = event.target;
        const newPosition = marker.getLatLng();
        setPosition(newPosition);
        onLocationChange(newPosition);

    };

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
        });
    }, [map, setPosition]);
    return position === null ? null : (
        <Marker
            position={position}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
                dragend: updatePosition
            }}
        >
            <Popup>You selected this location</Popup>
        </Marker>
    );
};

class MapCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: null,
            bbox: []
        };
    }

    setPosition = (position) => {
        const bounds = L.latLng(position).toBounds(1000).toBBoxString().split(",");
        this.setState({ position, bbox: bounds });
    }

    render() {
        const { position, bbox } = this.state;

        return (
            <MapContainer
                center={[49.1951, 16.6068]}
                zoom={13}
                scrollWheelZoom
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                    position={position}
                    setPosition={this.setPosition}
                    bbox={bbox}
                    onLocationChange={this.props.onLocationChange}
                />
            </MapContainer>
        );
    }
}

export default MapCreate;

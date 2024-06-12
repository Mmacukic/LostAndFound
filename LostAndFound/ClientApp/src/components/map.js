import {Component} from "react";
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {Icon} from "leaflet/src/layer";
import pinIcon from '../icons/pin_249680.png';

export class Map extends Component{
    
    render() {
        const {center} = this.props;
        const customIcon = new Icon({
            iconUrl: pinIcon,
            iconSize: [30, 30]
            
        });
        return(
            <div>
                <MapContainer center={center} zoom={13}>
                    <TileLayer
                        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                        url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    />
                    <Marker position={center} icon={customIcon}>
                        
                    </Marker>
                </MapContainer>
            </div>
        )
    }
}

import React, { useState, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "react-google-maps";

//antd
// import { Typography } from 'antd';
// import { FieldTimeOutlined, BgColorsOutlined, NodeIndexOutlined } from '@ant-design/icons';
//components
// import Portal from "../Portal";

// const { Text } = Typography;

// const DirectionMarker = ({ location, }) => {
//     return location.map((item, key) => {
//         return (
//             <Marker position={item} label={key + ""} key={key} />
//         )
//     })
// };

const MapComponent = ({ waypoints, center, origin, destination }) => {
    const [directions, setDirections] = useState();
    // const [quang_duong, setQuangDuong] = useState(0);
    // const [thoi_gian, setThoiGian] = useState(0);
    const { google } = window;
    const DirectionsService = new google.maps.DirectionsService();


    useEffect(() => {
        let location_waypoints = [];
        /* eslint-disable-next-line */
        waypoints.map(item => {
            location_waypoints = [
                ...location_waypoints,
                {
                    location: new google.maps.LatLng(item.latitude, item.longitude),
                    stopover: true,
                }
            ]
        })

        /* eslint-disable react-hooks/exhaustive-deps */
        DirectionsService.route(
            {
                origin: new google.maps.LatLng(origin.latitude, origin.longitude),
                destination: new google.maps.LatLng(destination.latitude, destination.longitude),
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: false,
                drivingOptions: {
                    departureTime: new Date(/* now, or future date */),
                    trafficModel: 'pessimistic'
                },
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                optimizeWaypoints: false,
                waypoints: location_waypoints,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                    // const { legs } = result?.routes[0];
                    // let tong_quang_duong = 0, tong_thoi_gian = 0;
                    // legs.forEach(leg => {
                    //     const { distance, duration } = leg;
                    //     tong_quang_duong += distance.value;
                    //     tong_thoi_gian += duration.value;
                    // });
                    // setQuangDuong(Math.round((tong_quang_duong / 1000) * 10) / 10);
                    // setThoiGian(Math.floor(tong_thoi_gian / 60));
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [waypoints])

    return (
        <>
            {/* <Portal id='google_detail'>
                <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 6, marginBottom: 12 }}>
                    <NodeIndexOutlined />
                    <Text type="secondary">{" Tổng quảng đường: "}</Text>
                    <Text strong type="secondary">{`${quang_duong} km`}</Text>
                    <br />
                    <FieldTimeOutlined />
                    <Text type="secondary">{" Tổng thời gian di chuyển dự tính: "}</Text>
                    <Text strong type="secondary">{`${thoi_gian} phút`}</Text>
                    <br />
                    <BgColorsOutlined />
                    <Text type="secondary">{" Mức tiêu thụ nhiên liệu dự tính: "}</Text>
                    <Text strong type="secondary">{`${id === '0' ? 1.28 : 0.2} lít dầu`}</Text>
                </div>
            </Portal> */}
            <GoogleMap key='AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns' defaultZoom={8} defaultCenter={{ lat: center.latitude, lng: center.longitude }}>
                {directions && <DirectionsRenderer directions={directions} markerOptions={{ suppressMarkers: true }} suppressMarkers={true} />}
                {/* <DirectionMarker location={location} /> */}
                {/* market vi tri kho */}
                <Marker position={new google.maps.LatLng(origin.latitude, origin.longitude)} label={"Kho"} />
            </GoogleMap>
        </>
    )
}

export default compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `95%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
)(MapComponent);



// import React, { useEffect, useRef, useState } from 'react'
// const Map = ({ options, onMount, className, onMountProps }) => {
//     const ref = useRef()
//     const [map, setMap] = useState()
//     useEffect(() => {
//         const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
//         if (!window.google) {
//             const script = document.createElement(`script`)
//             script.src =
//                 `https://maps.googleapis.com/maps/api/js?key=` +
//                 'AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns'
//             document.head.append(script)
//             script.addEventListener(`load`, onLoad)
//             return () => script.removeEventListener(`load`, onLoad)
//         } else onLoad()
//     }, [options])
//     if (map && typeof onMount === `function`) onMount(map, onMountProps)
//     return (
//         <div
//             style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
//             {...{ ref, className }}
//         />
//     )
// }

// Map.defaultProps = {
//     options: {
//         center: { lat: 48, lng: 8 },
//         zoom: 5,
//     },
// }

// export default Map;

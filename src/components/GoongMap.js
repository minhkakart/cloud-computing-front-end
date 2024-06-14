import * as React from "react";
import { Map, Marker } from "pigeon-maps";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function GoongMap() {
    const GG_API_KEY = "IMNomVoSheK1tt4tWeAdTFdDmvoGZobZB7teYwtN";
    const AUTO_SUGGEST_URL = "https://rsapi.goong.io/Place/AutoComplete";
    const GET_PLACE_DETAIL_URL = "https://rsapi.goong.io/Place/Detail";
    // const MAPTILES_KEY = "Ru7EeDoFcuJIs4eLfwcsUAlP0fGc9jwFnEdbjcEf";

    // const [viewport, setViewport] = useState({
    //     width: 1200,
    //     height: 800,
    //     latitude: 21,
    //     longitude: 106,
    //     zoom: 9,
    // });

    const [location, setLocation] = React.useState([20.9867976, 105.8393671]);
    const [zoom, setZoom] = useState(11);
    const [search, setSearch] = useState("");
    const ref = useRef(null);
    const [place, setPlace] = useState([]);

    const handleSearch = () => {
        console.log("Search:", ref.current.value);
        axios
            .get(AUTO_SUGGEST_URL, {
                params: {
                    api_key: GG_API_KEY,
                    input: search,
                    location: location.join(","),
                    radius: 30,
                    more_compound: false,
                },
            })
            .then((response) => {
                response.data.predictions.forEach((item) => {
                    axios
                        .get(GET_PLACE_DETAIL_URL, {
                            params: {
                                api_key: GG_API_KEY,
                                place_id: item.place_id,
                            },
                        })
                        .then((response) => {
                            console.log("Place detail:", response.data);
                            setPlace((place) => [...place, response.data.result.geometry.location]);
                        })
                        .catch((error) => {
                            console.error("Get place detail error:", error);
                        });
                });
            })
            .catch((error) => {
                console.error("Search error:", error);
            });
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Get the user's latitude and longitude coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation([lat, lng]);
                    setZoom(15);

                    // Do something with the location data, e.g. display on a map
                    console.log(`Latitude: ${lat}, longitude: ${lng}`);
                },
                // Error callback function
                (error) => {
                    // Handle errors, e.g. user denied location sharing permissions
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    console.log("Place:", place);

    return (
        <div>
            <Map height={700} zoom={zoom} center={location}>
                {place.map((item, index) => {
                    return (
                        <Marker
                            key={index}
                            anchor={[item.lat, item.lng]}
                            payload={1}
                            onClick={({ event, anchor, payload }) => {}}
                        />
                    );
                })}
            </Map>

            <div className="mb-3">
                <label htmlFor="search" className="form-label">
                    Search
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="search"
                    id="search"
                    ref={ref}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default GoongMap;

import React, { useEffect, useState, useCallback } from "react";
import ReactMapGL, {
  NavigationControl,
  Marker,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Amplify, { Auth } from "aws-amplify";
import { Signer } from "@aws-amplify/core";
import Location from "aws-sdk/clients/location";
import awsconfig from "../../aws-exports";
import { Pin } from "./helpers/Pin";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

Amplify.configure(awsconfig);
const mapName = "MyMap";
const SEARCH_INDEX = "IndexSearch";

const transformRequest = (credentials) => (url, resourceType) => {
  // Resolve to an AWS URL
  if (resourceType === "Style" && !url?.includes("://")) {
    url = `https://maps.geo.${awsconfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
  }

  // Only sign AWS requests (with the signature as part of the query string)
  if (url?.includes("amazonaws.com")) {
    return {
      url: Signer.signUrl(url, {
        access_key: credentials.accessKeyId,
        secret_key: credentials.secretAccessKey,
        session_token: credentials.sessionToken,
      }),
    };
  }

  // Don't sign
  return { url: url || "" };
};

function Search(props) {
  const [place, setPlace] = useState("");
  const [sugerencias, setsugerencias] = useState([]);
  const { searchPlace } = props;
  const { suggest } = props;

  const handleText = async () => {
    if (place) {
      const sugerencias = await suggest(place);
      setsugerencias(sugerencias);
    } else {
      toast.warning("Debes ingresar una ubicación");
    }
  };

  const handleSuggest = (suggest) => {
    setPlace(suggest);
    setsugerencias([]);
    searchPlace(place);
  };

  return (
    <>
      <div className="position-relative">
        <div className="input-group">
          <InputText
            type="text"
            autoComplete="off"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setsugerencias([]);
              }, 100);
            }}
            placeholder="Santa Rosa & Guatemala, Santo Domingo de los Colorados, Santo Domingo, ECU"
            className="form-control"
          />
          <Button
            className="p-button-outlined"
            icon="pi pi-search"
            onClick={handleText}
          />
        </div>
        <div
          id="result"
          className="card shadow rounded border py-1"
          style={{ position: "absolute", zIndex: 1 }}
        >
          <ul>
            {sugerencias &&
              sugerencias.map((sugg, i) => (
                <li
                  className="mx-2 mt-1"
                  onMouseDown={() => handleSuggest(sugg.Text)}
                  key={i}
                >
                  {sugg.Text}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const geolocateControlStyle = {
  left: 20,
  top: 100,
};

export const Mapa = (props) => {
  const { altitudMapa } = props;
  const { setLatitud } = props;
  const { setLongitud } = props;
  const [credentials, setCredentials] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: -79.17159275402884,
    latitude: -0.2543376447707177,
    zoom: 12,
  });
  const [client, setClient] = useState(null);
  const [searchMarker, setSearchMarker] = useState({
    longitude: -79.17159275402884,
    latitude: -0.2543376447707177,
  });

  useEffect(() => {
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };
    fetchCredentials();
    const createClient = async () => {
      const credentials = await Auth.currentCredentials();
      const client = new Location({
        credentials,
        region: awsconfig.aws_project_region,
      });
      setClient(client);
    };
    createClient();
  }, []);

  const searchPlace = (place) => {
    const params = {
      IndexName: SEARCH_INDEX,
      Text: place,
    };
    client.searchPlaceIndexForText(params, (err, data) => {
      if (err) console.error(err);
      if (data) {
        const coordinates = data.Results[0].Place.Geometry.Point;
        setViewport({
          longitude: coordinates[0],
          latitude: coordinates[1],
          zoom: 13,
        });
        setSearchMarker({
          longitude: coordinates[0],
          latitude: coordinates[1],
        });
        setLongitud(coordinates[0]);
        setLatitud(coordinates[1]);
        return coordinates;
      }
    });
  };

  const suggestPlaces = async (placeText) => {
    const params = {
      IndexName: SEARCH_INDEX,
      Text: placeText,
      MaxResults: 4,
    };
    const data = await client.searchPlaceIndexForSuggestions(params).promise();
    const response = data;

    return response.Results;
  };

  const onMarkerDragEnd = useCallback((event) => {
    setSearchMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setLongitud(event.lngLat[0]);
    setLatitud(event.lngLat[1]);
  }, []);

  return (
    <>
      <div className="mb-2">
        <Search searchPlace={searchPlace} suggest={suggestPlaces} />
      </div>
      <div className="border">
        {credentials ? (
          <ReactMapGL
            {...viewport}
            width="100%"
            height={altitudMapa}
            transformRequest={transformRequest(credentials)}
            mapStyle={mapName}
            onViewportChange={setViewport}
          >
            <div style={{ position: "absolute", left: 20, top: 20 }}>
              <NavigationControl showCompass={false} />
            </div>
            <GeolocateControl
              style={geolocateControlStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserLocation={true}
              label={"Ubicación actual"}
              className="shadow-sm"
            />
            <Marker
              longitude={searchMarker.longitude}
              latitude={searchMarker.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable
              onDragEnd={onMarkerDragEnd}
            >
              <Pin size={25} color={"#F30808"} />
            </Marker>
          </ReactMapGL>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

import React, { useEffect, useState, useCallback } from "react";
import ReactMapGL, {
  NavigationControl,
  Source,
  Layer,
  Marker,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Amplify, { Auth } from "aws-amplify";
import { Signer } from "@aws-amplify/core";
import Location from "aws-sdk/clients/location";
import awsconfig from "../../aws-exports";
import { Pin } from "./helpers/Pin";
import * as turf from "@turf/turf";
import { Routing } from "./helpers/Routing";
import { get } from "../webServices/Get";
import {
  searchPlace,
  calculateRoute,
  makeLegFeatures,
  calculateRouteWayPoints,
} from "./helpers/RoutingHelpers";
import { toast, ToastContainer } from "react-toastify";
import { RoutingEstab } from "./helpers/RoutingEstab";
import { ProgressSpinner } from "primereact/progressspinner";

Amplify.configure(awsconfig);
const mapName = "MyMap";
const SEARCH_INDEX = "IndexSearch";
const ROUTE_CALCULATOR = "storeRouteCalc";

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

const routeLayer = {
  type: "line",
  layout: {
    "line-join": "round",
  },
  paint: {
    "line-color": "#144BBB",
    "line-width": 3,
  },
};

const geolocateControlStyle = {
  left: 20,
  top: 100,
};

export const MapaStores = (props) => {
  const { establecimientos } = props;
  const { idEmpresa } = props;
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
  const [routeLine, setRouteLine] = useState(turf.featureCollection([]));
  const [stores, setStores] = useState([]);
  const [distancia, setDistancia] = useState();
  const [showPopUp, toggleDown] = useState(true);

  useEffect(() => {
    const getEstabs = async (id) => {
      try {
        const response = await get(`establecimientos/empresa/${id}`);
        setStores(response);
      } catch (e) {
        toast.error("Ups! algo ha salido mal. Intente nuevamente");
      }
    };
    getEstabs(idEmpresa);
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

  const findRoute = async (from, to, type) => {
    let storeTo = "";
    let storeFrom = "";
    let wayPoints = [];
    let fromAddress = [];
    let toAddress = [];
    let wayAddress = [];
    let routeResp = [];

    //1. get the positions for the selected store
    if (type === "busqueda") {
      storeFrom = await searchPlace(SEARCH_INDEX, client, from);
      storeTo = stores.find((item) => {
        return item.codigo_estab === to;
      });
      setViewport({
        longitude: storeFrom[0],
        latitude: storeFrom[1],
        zoom: 14,
        transitionDuration: 3000,
      });
      setSearchMarker({
        longitude: storeFrom[0],
        latitude: storeFrom[1],
      });

      // 3. calculate route
      fromAddress = {
        longitude: storeFrom[0],
        latitude: storeFrom[1],
      };

      const toStore = {
        longitude: parseFloat(storeTo.longitud_estab),
        latitude: parseFloat(storeTo.latitud_estab),
      };

      routeResp = await calculateRoute(
        ROUTE_CALCULATOR,
        client,
        fromAddress,
        toStore
      );
      setDistancia(routeResp.Legs[0].Distance);
      const route = makeLegFeatures(routeResp.Legs);
      setRouteLine(turf.featureCollection(route));
    } else {
      storeFrom = stores.find((item) => {
        return item.codigo_estab === from;
      });
      if (Object.keys(to).length > 1) {
        let aux = to[to.length - 1].estab;
        // 2. get the position for the searched address
        storeTo = stores.find((item) => {
          return item.codigo_estab == aux;
        });
        // 3. Obtenemos los waypoints
        for (let index = 0; index < to.length - 1; index++) {
          wayPoints[index] = stores.find((item) => {
            return item.codigo_estab === to[index].estab;
          });
        }
      } else {
        storeTo = stores.find((item) => {
          return item.codigo_estab == to[0].estab;
        });
      }
      setViewport({
        longitude: storeFrom.longitud_estab,
        latitude: storeFrom.latitud_estab,
        zoom: 14,
        transitionDuration: 3000,
      });
      // 3. obtener latitud y longitud
      fromAddress = {
        longitude: storeFrom.longitud_estab,
        latitude: storeFrom.latitud_estab,
      };
      toAddress = {
        longitude: storeTo.longitud_estab,
        latitude: storeTo.latitud_estab,
      };

      if (wayPoints) {
        wayPoints.map((point, i) => {
          wayAddress[i] = {
            longitude: point.longitud_estab,
            latitude: point.latitud_estab,
          };
        });
        routeResp = await calculateRouteWayPoints(
          ROUTE_CALCULATOR,
          client,
          fromAddress,
          toAddress,
          wayAddress
        );
      } else {
        routeResp = await calculateRoute(
          ROUTE_CALCULATOR,
          client,
          fromAddress,
          toAddress
        );
      }

      setDistancia(routeResp.Legs[0].Distance);
      const route = makeLegFeatures(routeResp.Legs);
      setRouteLine(turf.featureCollection(route));
    }
  };

  const onMarkerDragEnd = useCallback((event) => {
    setSearchMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);

  return (
    <>
      <div className="row h-100">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
          <RoutingEstab stores={establecimientos} findRoute={findRoute} />
          <Routing
            stores={establecimientos}
            findRoute={findRoute}
            index={SEARCH_INDEX}
            client={client}
          />
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 h-100">
          {credentials ? (
            <ReactMapGL
              {...viewport}
              width="100%"
              height="90%"
              transformRequest={transformRequest(credentials)}
              mapStyle={mapName}
              onViewportChange={setViewport}
              className="border border-2"
            >
              <div
                className="shadow-sm"
                style={{ position: "absolute", left: 20, top: 20 }}
              >
                <NavigationControl showCompass={false} />
              </div>
              <div style={{ position: "absolute", left: 100, top: 20 }}>
                {distancia && (
                  <div className="card px-3 py-1 shadow-lg rounded">
                    <h6 className="mt-1">
                      Distancia a recorrer:{" "}
                      <em className="fw-normal">{Math.round(distancia)} km</em>
                    </h6>
                  </div>
                )}
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
                offsetTop={-25}
                offsetLeft={-10}
                draggable
                onDragEnd={onMarkerDragEnd}
              >
                {/* <Pin size={25} color={"#F30808"} /> */}
                <i
                  className="fa fa-map-marker-alt text-danger"
                  style={{ fontSize: "30px" }}
                ></i>
              </Marker>

              {stores.map((estab, index) => (
                <Marker
                  key={index}
                  longitude={estab.longitud_estab}
                  latitude={estab.latitud_estab}
                  offsetTop={-20}
                  offsetLeft={-50}
                >
                  {/* <Pin size={25} color={"#27A21A"} /> */}
                  <div
                    className="text-center"
                    onMouseEnter={() => toggleDown(false)}
                    onMouseLeave={() => toggleDown(true)}
                    style={{ width: 100, height: 75 }}
                  >
                    <i
                      className="fa fa-map-marker-alt text-success"
                      style={{ fontSize: "30px" }}
                    ></i>
                    <div>
                      {showPopUp && (
                        <div className="card px-2 rounded shadow">
                          <h6 className="mt-1 w-100">{estab.codigo_estab}</h6>
                        </div>
                      )}
                    </div>
                  </div>
                </Marker>
              ))}

              <Source id="routeLine" type="geojson" data={routeLine}>
                <Layer {...routeLayer} />
              </Source>
            </ReactMapGL>
          ) : (
            <>
              <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                  <div className="col-auto">
                    <ProgressSpinner strokeWidth="5" />
                  </div>
                </div>
              </div>
            </>
          )}
          <ToastContainer autoClose={5000} />
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "state";
import buildingsdata from "./buildingsdata"
import storedata from "./storedata"

import MapView from "components/Map";
import Map from "components/Mapp"

const Geography = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.global.searchQuery)
  const mapData = useSelector(state => state.global.mapData)
  const theme = useTheme();

  // const markers = buildingsdata.features;

  const [markers,setMarkers] = useState([])
  const [filteredMarkers, setFilteredMarkers] = useState([...markers])

  useEffect(() => {
    dispatch(setActivePage("geography"))
  }, []);

  useEffect(() => {
    console.log("MAP DATA:", mapData)
    mapData === "Buildings" ? setMarkers(buildingsdata.features) : setMarkers(storedata.features)
  },[mapData])

  useEffect(() => {
    console.log("markers:",markers)
    setFilteredMarkers(markers)
  }, [markers])

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMarkers(markers)
    }
    let filtered = markers.filter(marker => {
      if (marker.properties.subcounty.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.subcounty.toLowerCase().includes(searchQuery.toLowerCase())
      }

      if (marker.properties.ward.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.ward.toLowerCase().includes(searchQuery.toLowerCase())
      }

      if (marker.properties.streetname.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.streetname.toLowerCase().includes(searchQuery.toLowerCase())
      }

      if (marker.properties.buildingnumber.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.buildingnumber.toLowerCase().includes(searchQuery.toLowerCase())
      }   

      if (marker.properties.paymentstatus.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.paymentstatus.toLowerCase() === searchQuery.toLowerCase()
      }

      if (marker.properties.typeofstructure.toLowerCase().includes(searchQuery.toLowerCase())) {
        return marker.properties.typeofstructure.toLowerCase().includes(searchQuery.toLowerCase())
      }
    })

    setFilteredMarkers(filtered)
  }, [searchQuery])


  return (
    <React.Fragment>
      <MapView markers={filteredMarkers} />
    </React.Fragment>
  );
};

export default Geography;

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage, setCountyBuildings } from "state";
import buildingsdata from "./buildingsdata"
import storedata from "./storedata"
import { getAllCountyBuildings, getUsername, getCounty } from "../../helper/helper"

import MapView from "components/Map";
import Map from "components/Mapp"

const Geography = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.global.searchQuery)
  const mapData = useSelector(state => state.global.mapData)
  const theme = useTheme();
  const [user, setUser] = useState()
  const [county, setCounty] = useState()
  const [countyBuildings, setCountyBuildings] = useState()

  // const markers = buildingsdata.features;

  const [markers, setMarkers] = useState([])
  const [filteredMarkers, setFilteredMarkers] = useState([...markers])
  function renameObjectKeys(array, keyMap) {
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
      const oldObject = array[i];
      const newObject = {};

      for (let oldKey in oldObject) {
        if (oldObject.hasOwnProperty(oldKey)) {
          const newKey = keyMap[oldKey] || oldKey;
          newObject[newKey] = oldObject[oldKey];
        }
      }
      newArray.push(newObject);
    }

    return newArray;
  }

  function getPaymentStatusDistribution(permits) {
    const result = permits?.reduce((acc, permit) => {
      const paymentStatus = permit.payment_status;

      if (paymentStatus === 'Paid') {
        acc.paid++;
      } else if (paymentStatus === 'Partially Paid') {
        acc.partiallyPaid++;
      } else if (paymentStatus === 'Not Paid') {
        acc.notPaid++;
      }

      return acc;
    }, { paid: 0, partiallyPaid: 0, notPaid: 0 });

    if (permits.length === 0) {
      // Return empty result if the permits array is empty
      return "No Occupants";
    }

    // return result;
    const highestPaymentStatus = Object.keys(result).reduce((a, b) =>
      result[a] > result[b] ? a : b
    );

    return highestPaymentStatus;
  }

  useEffect(() => {
    dispatch(setActivePage("geography"))
  }, []);

  useEffect(() => {
    if (user) {
      const fetchCounty = async () => {
        try {
          const { data } = await getCounty(user.county_id)
          setCounty(data[0].name)
        } catch (error) {
          console.log("Error fetching county:", error);
        }
      }

      fetchCounty()
    }
  }, [user]);

  useEffect(() => {
    if (county) {
      const fetchBuildings = async () => {
        try {
          const { data } = await getAllCountyBuildings(county)
          const keyMap = {
            building_number: "buildingNumber",
            street: "streetname",
            sub_county: "subcounty",
            type_of_structure: "typeofstructure"
          }
          const renamed = renameObjectKeys(data, keyMap)
          const mapped = renamed.map((obj) => {
            // console.log(obj)
            const paymentDistribution = getPaymentStatusDistribution(obj?.singleBusinessPermits)
            const { latitude, longitude, ...properties } = obj;            
            // console.log(paymentDistribution)
            // console.log(obj?.singleBusinesPermits)
            let payment_status
            if (paymentDistribution == "notPaid") {
              payment_status = "Not Paid"
            } else if (paymentDistribution == "partiallyPaid") {
              payment_status = "Partially Paid"
            } else if (paymentDistribution == "paid") {
              payment_status = "Paid"
            } else if (paymentDistribution == "No Occupants") {
              payment_status = "No Occupants"
            }

            return {
              type: "Feature",
              properties: {
                ...properties,
                latitude,
                longitude,
                paymentstatus: payment_status
              },
              geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
              }
            };
          });

          console.log(mapped)
          dispatch(setCountyBuildings(mapped))
          setCountyBuildings(mapped)
        } catch (error) {
          console.log("Error fetching buildings:", error);
        }
      }

      fetchBuildings()
    }
  }, [county])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsername();
        setUser(res);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    mapData === "Buildings" ? setMarkers(buildingsdata.features) : setMarkers(storedata.features)
  }, [mapData])

  useEffect(() => {
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
      {/* <MapView markers={filteredMarkers} /> */}
      {countyBuildings && <MapView markers={countyBuildings} />}
      
    </React.Fragment>
  );
};

export default Geography;
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery, useGetCountyBuildingsQuery } from "state/api";
import { useEffect } from "react";
import { getUsername, getCounty, getCountyBuildings } from "helper/helper";
import { useDispatch,useSelector } from "react-redux";
import { setCountyBuildings } from "state";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const activePage = useSelector((state) => state.global.activePage);
  const dispatch = useDispatch()
  // const user = useSelector(state => state.global.user)
  // const county = useSelector(state => state.global.county)
  const { data } = useGetUserQuery(userId);
  const [user, setUser] = useState()
  const [county, setCounty] = useState()
  const [buildings, setBuildings] = useState()

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
    console.log("user:",user)
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
  }, [user])

  useEffect(() => {
    if(county){
      const fetchBuildings = async () => {
        try {
          const {data} = await getCountyBuildings({county, category:""})
          setBuildings(data)
        } catch (error) {
          console.log("Error fetching buildings:", error);
        }
      }

      fetchBuildings()
    }
    
  }, [county])

  useEffect(() => {
    buildings !== undefined && dispatch(setCountyBuildings(buildings))
  },[buildings,dispatch])

  useEffect(() => {
    if (activePage === "geography") {
      setIsSidebarOpen(false)
    }
  }, [activePage])

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* <Box flexGrow={1} > */}
      <Box flexGrow={1} style={{ overflow: activePage === 'geography' && "hidden" }}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
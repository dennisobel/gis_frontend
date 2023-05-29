import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setSearchQuery, setMapType, setMapData } from "state";
import profileImage from "assets/profile.jpg";
import { setCountyBuildings } from "state";
import { getUsername, getCounty, getCountyBuildings } from "helper/helper";
import {
  AppBar,
  Button,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataAnchorEl, setDataAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isMapDataOpen = Boolean(dataAnchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMapDataClick = (event) => setDataAnchorEl(event.currentTarget);
  const handleMapDataClose = () => setDataAnchorEl(null);
  const activePage = useSelector((state) => state.global.activePage);
  const login = useSelector(state => state.global.login)
  const countyBuildings = useSelector(state => state.global.buildings)
  const [query, setQuery] = useState()


  const [animationStyle, setAnimationStyle] = useState({});
  const mapType = ["Markers", "Clusters"]
  const mapData = ["Buildings", "Stores"]

  const [loggeduser, setUser] = useState()
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
    console.log("user:",loggeduser)
    if (loggeduser) {
      const fetchCounty = async () => {
        try {
          const { data } = await getCounty(loggeduser.county_id)
          
          setCounty(data[0].name)
          // const buildings = await getCountyBuildings(data[0]?.name)
          // console.log("COUNTY BUILDINGS:", buildings)
        } catch (error) {
          console.log("Error fetching county:", error);
        }
      }

      fetchCounty()
    }
  }, [loggeduser])

  useEffect(() => {
    if(county){
      const fetchBuildings = async () => {
        try {
          // const {data} = await getCountyBuildings({county, category:query})
          const {data} = await getCountyBuildings({ county, ...(query !== '' && { category: query }) });

          setBuildings(data)
        } catch (error) {
          console.log("Error fetching buildings:", error);
        }
      }

      fetchBuildings()
    }
    
  }, [county,query])

  useEffect(() => {
    buildings !== undefined && dispatch(setCountyBuildings(buildings))
  },[buildings,dispatch])

  useEffect(() => {
    setAnimationStyle({ animation: 'shimmer 2s infinite' });
  }, []);

  const handleInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
    setQuery(event.target.value)
  };
  return (
    <AppBar
      sx={{
        position: activePage === "geography" ? "fixed" : "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* /**LEFT SIDE */}
        <FlexBetween>

        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1rem">
          {activePage === "geography" && <>


            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[400] }}
                >
                  MAP TYPE
                </Typography>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[600], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                {mapType.map(el => <MenuItem key={el} onClick={() => dispatch(setMapType(el))}>{el}</MenuItem>)}
              </Menu>
            </FlexBetween>
          </>}

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="0 1rem"
          >
            <IconButton className="icon" style={animationStyle} sx={{ p: "8px" }} aria-label="menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            {activePage === "geography" && <InputBase sx={{ height: "1px", width: "524px" }} placeholder="Filter subcounty, ward, street, payment status, building number, type of structure" onChange={handleInputChange} />}

            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

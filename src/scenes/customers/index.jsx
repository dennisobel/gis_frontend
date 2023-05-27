import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { getCountyBusiness, getUsername} from "helper/helper";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const login = useSelector(state => state.global.login)
  const [user,setUser] = useState()
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRows] = useState();

  const [columns,setColumns] = useState([
    {
      field: "branch_name",
      headerName: "Branch",
      flex: 0.5,
    },
    {
      field: "building_name",
      headerName: "Building",
      flex: 0.5,
    },
    {
      field: "business_email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "business_phone",
      headerName: "Phone Number",
      flex: 0.5,
    },

    {
      field: "payment_status",
      headerName: "Compliance",
      flex: 0.5,
    },
  ]);

  useEffect(()=>{
    getUsername().then(res => setUser(res))
  },[])

  useEffect(() => {
    user !== undefined && getCountyBusiness({county:user?.county_id}).then(({data}) => setRows(data))
  }, [user])
  

  useEffect(() => {
    login.role === "management" && setColumns([...columns,{
      field: "country",
      headerName: "Ward",
      flex: 0.4,
    }])
  }, [])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BUSINESSES" subtitle="List of Businesses" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !rows}
          getRowId={(row) => row._id}
          rows={rows || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
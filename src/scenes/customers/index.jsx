import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCountyBusinesesQuery } from "state/api";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { getCountyBusiness, getUsername, getCounty } from "helper/helper";

const Customers = () => {
  const theme = useTheme();
  
  const login = useSelector(state => state.global.login)
  const [user, setUser] = useState()

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [county,setCounty] = useState()
  const [businesses,setCountyBusinesses] = useState()

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCountyBusinesesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    county: user?.county_id
  });

  const [rows, setRows] = useState();

  const columns = [
    {
      field: "business_name",
      headerName: "Business Name",
      flex: 0.5,
    },
    {
      field: "branch_name",
      headerName: "Branch",
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
  ]
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
    if(county){
      const fetchBusinesses = async () => {
        try {
          const {data} = await getCountyBusiness({county})
          console.log("DATA:",data)
          setCountyBusinesses(data)
        } catch (error) {
          console.log("Error fetching buildings:", error);
        }
      }

      fetchBusinesses()
    }
  }, [county])

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
          loading={isLoading || !businesses?.countyBusinesses}
          getRowId={(row) => row._id}
          rows={businesses?.countyBusinesses || []}
          columns={columns}
          rowCount={(businesses?.countyBusinesses && businesses?.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{
            ColumnMenu: CustomColumnMenu,
            Toolbar: DataGridCustomToolbar
          }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Customers;
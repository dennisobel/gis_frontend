import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import { Box, useTheme, Select, MenuItem, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import AddRevenueOfficerModal from "./AddRevenueOfficerModal"
import ViewOfficer from "./ViewOfficer";
import {
  Delete,
} from "@mui/icons-material";
import { useEffect } from "react";
import { getUsers } from "helper/helper";
import { updateUser } from "helper/helper";
import { useSelector } from "react-redux";

const Admin = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false)
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRows] = useState();
  const user = useSelector(state => state.global.login)

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        const countyOfficers = data.filter((el) => {
          return el.role === "revenueOfficer" && el.county_id === user.county_id
        })
        setRows(countyOfficers);
      })
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  function handleEditRowsModelChange(event) {
    const changedRow = rows?.filter(row => row._id === Object.keys(event)[0]);
    const flattenedEvent = Object.keys(event).reduce((result, key) => {
      const innerObj = event[key];
      Object.keys(innerObj).forEach(innerKey => {
        result[innerKey] = innerObj[innerKey].value;
      });
      return result;
    }, {});

    console.log({ ...changedRow[0], ...flattenedEvent })

    updateUser({ ...changedRow[0], ...flattenedEvent })
      .then(() => {
        console.log("UPDATE SUCCESS")
      })
      .catch(err => console.error(err))

    const changes = event[Object.keys(event)[0]]?.changes;
    if (changes) {
      setRows([...rows.filter(row => row._id !== Object.keys(event)[0]), { ...changedRow[0], ...flattenedEvent }]);
    }
  }

  const wardOptions = [
    { value: "ward1", label: "Ward 1" },
    { value: "ward2", label: "Ward 2" },
    { value: "ward3", label: "Ward 3" },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      editable: true
    },
    {
      field: "msisdn",
      headerName: "Phone Number",
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "ward",
      headerName: "Ward",
      flex: 0.4,
      editable: true,
      editCell: (params) => {
        const { id, field, value, api } = params;

        const handleChange = (event) => {
          api.setEditCellValue({ id, field, value: event.target.value });
        };

        return (
          <Select value={value} onChange={handleChange}>
            {wardOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    // {
    //   field: 'view',
    //   headerName: 'View',
    //   sortable: false,
    //   width: 120,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     const handleEdit = (event) => {
    //       event.stopPropagation();
    //       setOpenView(true)
    //     };

    //     return (
    //       <IconButton variant="text" color="secondary" onClick={handleEdit}>
    //         <Visibility />
    //       </IconButton>
    //     );
    //   },
    // },
    // {
    //   field: 'edit',
    //   headerName: 'Edit',
    //   sortable: false,
    //   width: 120,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     const handleEdit = (event) => {
    //       event.stopPropagation();
    //       setOpenView(true)
    //     };

    //     return (
    //       <IconButton variant="text" color="secondary" onClick={handleEdit}>
    //         <Edit />
    //       </IconButton>
    //     );
    //   },
    // },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleDelete = (event) => {
          event.stopPropagation();
        };

        return (
          <IconButton variant="text" color="red" onClick={handleDelete}>
            <Delete />
          </IconButton>
        );
      },
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="REVENUE ADMINS" subtitle="List of revenue officers" />

        <Box>
          <AddRevenueOfficerModal isOpen={open} onClose={handleClose} />
          <ViewOfficer isOpen={openView} onClose={handleCloseView} />
        </Box>
      </FlexBetween>

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
          onCellEditStop={(params) => {
            const updatedRow = params.getRowParams(params.id).row;
            const rowIndex = params.id;
            console.log("Database updated:", updatedRow);
          }}
          onEditRowsModelChange={handleEditRowsModelChange}
          loading={!rows}
          getRowId={(row) => row._id}
          // rows={data || []}
          rows={rows || []}
          columns={columns}
          editMode="row"
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
          onRowKeyDown={(e) => {
            console.log("row entered")
          }}
          onCellKeyDown={(event, params) => {
            // console.log("event:", event)
            // console.log("params:", params)
            if (event.key === 'Enter') {
              console.log('Enter key pressed');
            }
          }
          }
        />
      </Box>
    </Box>
  );
};

export default Admin;
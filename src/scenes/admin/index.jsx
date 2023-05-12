import React, { useState, useRef } from "react";
import FlexBetween from "components/FlexBetween";
import { Box, useTheme, Button, Modal, TextField, Typography, Stack, Select, MenuItem, InputLabel, IconButton } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";

import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import AddRevenueOfficerModal from "./AddRevenueOfficerModal"
import ViewOfficer from "./ViewOfficer";
import {
  Edit,
  Delete,
  PersonAdd,
  Visibility,
} from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { setRevenueOfficer } from "state";
import { useEffect } from "react";

const Admin = () => {
  const initialRows = []
  const dispatch = useDispatch()
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false)
  const [officerData, setOfficerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    block: ""
  })
  const [rows, setRows] = React.useState(data);

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
    console.log("RED-DOT:",event,data)
    const updatedRows = rows.map((row) => {
      const { _id } = row;
      const index = event.findIndex((item) => item._id === _id);
      if (index > -1) {
        return { ...row, ...event[index].changes };
      }
      return row;
    });
    setRows(updatedRows);
  }

  useEffect(()=>{
    console.log("ROWS:",rows)
  },[rows])

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
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Block",
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
    {
      field: 'view',
      headerName: 'View',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleEdit = (event) => {
          event.stopPropagation();
          setOpenView(true)
        };

        return (
          <IconButton variant="text" color="secondary" onClick={handleEdit}>
            <Visibility />
          </IconButton>
        );
      },
    },
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
        <Header title="REVENUE ADMINS" subtitle="List of revenue admins" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}

            onClick={handleOpen}
          >
            <PersonAdd sx={{ mr: "10px" }} />
            Add Revenue Officer
          </Button>
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
          onCellEditStop={() => console.log("commited")}
          onEditRowsModelChange={handleEditRowsModelChange}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          editMode="row"
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
          onRowKeyDown={(e) => {
            console.log("row entered")
          }}
          onCellKeyDown={(event) => {
            if (event.key === 'Enter') {
              // handle the Enter key press here
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
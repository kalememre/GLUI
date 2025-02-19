"use client";
import PageContainer from "./components/container/PageContainer";
import DashboardCard from "./components/shared/DashboardCard";
import Grid from "@mui/material/Grid2";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Box,
  Link,
  Typography,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getCompanies } from "@/store/Company";
import CompanyForm from "./components/forms/CompanyForm";

const Home = () => {
  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Typography variant="h6">{`${params?.row?.name}`}</Typography>
          </div>
        );
      },
    },
    {
      field: "exchange",
      headerName: "Exchange",
      description: "This column has a value getter and is not sortable.",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Typography variant="h6">{`${params?.row?.exchange}`}</Typography>
          </div>
        );
      },
    },
    {
      field: "stockTicker",
      headerName: "Stock Ticker",
      description: "This column has a value getter and is not sortable.",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Typography variant="h6">{`${params?.row?.stockTicker}`}</Typography>
          </div>
        );
      },
    },
    {
      field: "isin",
      headerName: "ISIN",
      description: "This column has a value getter and is not sortable.",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Typography variant="h6">{`${params?.row?.isin}`}</Typography>
          </div>
        );
      },
    },
    {
      field: "website",
      headerName: "Website",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params?.row?.website && (
              <Link href={params?.row?.website} target="_blank">
                <Typography variant="h6">{`${params?.row?.website}`}</Typography>
              </Link>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { companies, companiesLoading } = useSelector(
    (state) => state.storeCompany
  );

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleAdd = () => {
    setEditData(null);
    setDrawerOpen(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditData(null);
  };

  return (
    <PageContainer title="Home" description="this is Home">
      <DashboardCard title="Dashboard">
        <Box sx={{ height: "100%", width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddAltIcon />}
            onClick={handleAdd}
            sx={{ mb: 2 }}
          >
            Add Company
          </Button>
          <DataGrid
            loading={companiesLoading}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            rows={companies || []}
            columns={columns}
            pageSizeOptions={[10]}
          />
        </Box>
      </DashboardCard>
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 400, p: 3 }}>
          <CompanyForm data={editData} onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </PageContainer>
  );
};

export default Home;

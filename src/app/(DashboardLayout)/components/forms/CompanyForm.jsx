import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, updateCompany } from "@/store/Company";

const isinRegex = /^[A-Z]{2}[A-Z0-9]{10}$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Exchange must be at least 3 characters long"),
  exchange: yup
    .string()
    .required("Exchange is required")
    .min(3, "Exchange must be at least 3 characters long"),
  stockTicker: yup
    .string()
    .required("Stock Ticker is required")
    .min(3, "Exchange must be at least 3 characters long"),
  isin: yup
    .string()
    .length(12, "ISIN must be 12 characters long")
    .required("ISIN is required")
    .matches(isinRegex, "Invalid ISIN"),
  website: yup
    .string()
    .nullable()
    .test("is-url", "Invalid URL", (value) => {
      if (!value) return true;
      return yup.string().url().isValidSync(value);
    }),
});

const CompanyForm = ({ data, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data || {
      name: "",
      exchange: "",
      stockTicker: "",
      isin: "",
      website: "",
    },
  });

  const dispatch = useDispatch();
  const { companyLoading } = useSelector((state) => state.storeCompany);

  const onSubmit = (formData) => {
    if (data) {
      dispatch(updateCompany({ ...formData, id: data.id })).then((res) => {
        if (!res.error) {
          onClose();
        }
      });
    } else {
      dispatch(addCompany(formData)).then((res) => {
        if (!res.error) {
          onClose();
        }
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" mb={2}>
        {data ? "Edit Company" : "Add Company"}
      </Typography>
      <Stack spacing={3}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Company Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />
        <Controller
          name="exchange"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Exchange"
              variant="outlined"
              fullWidth
              error={!!errors.exchange}
              helperText={errors.exchange ? errors.exchange.message : ""}
            />
          )}
        />
        <Controller
          name="stockTicker"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Stock Ticker"
              variant="outlined"
              fullWidth
              error={!!errors.stockTicker}
              helperText={errors.stockTicker ? errors.stockTicker.message : ""}
            />
          )}
        />
        <Controller
          name="isin"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="ISIN"
              variant="outlined"
              fullWidth
              error={!!errors.isin}
              helperText={errors.isin ? errors.isin.message : ""}
            />
          )}
        />
        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Website"
              variant="outlined"
              fullWidth
              error={!!errors.website}
              helperText={errors.website ? errors.website.message : ""}
            />
          )}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        loading={companyLoading}
      >
        {data ? "Update" : "Add"}
      </Button>
    </Box>
  );
};

export default CompanyForm;

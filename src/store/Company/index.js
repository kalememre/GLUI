// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils
import axiosInstance from '../axiosDefault'

export const getCompanies = createAsyncThunk('companies/getCompanies', async (data) => {
    try {
        const response = await axiosInstance.get('/company', { params: data })
        return response.data
    } catch (error) {
        throw error.response.data
    }
});

export const getCompanyById = createAsyncThunk('companies/getCompanyById', async (id) => {
    try {
        const response = await axiosInstance.get(`/company/${id}`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
});

export const getCompanyByIsin = createAsyncThunk('companies/getCompanyByIsin', async (isin) => {
    try {
        const response = await axiosInstance.get(`/company/isin/${isin}`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
});

export const addCompany = createAsyncThunk('companies/addCompany', async (data) => {
    try {
        const response = await axiosInstance.post('/company', data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
});

export const updateCompany = createAsyncThunk('companies/updateCompany', async (data) => {
    try {
        const response = await axiosInstance.put(`/company/${data.id}`, data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
});

export const appCompanySlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        company: {},
        companiesLoading: false,
        companyLoading: false,
        companiesError: '',
        companyError: ''
    },
    reducers: {
        clearCompanies: (state) => {
            state.companies = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getCompanies.pending, (state) => {
            state.companiesLoading = true
        });
        builder.addCase(getCompanies.fulfilled, (state, action) => {
            state.companies = action.payload
            state.companiesLoading = false
        });
        builder.addCase(getCompanies.rejected, (state, action) => {
            state.companiesError = action.error.message
            state.companiesLoading = false
        });

        builder.addCase(getCompanyById.pending, (state) => {
            state.companyLoading = true
        });
        builder.addCase(getCompanyById.fulfilled, (state, action) => {
            state.company = action.payload
            state.companyLoading = false
        });
        builder.addCase(getCompanyById.rejected, (state, action) => {
            state.companyError = action.error.message
            state.companyLoading = false
        });

        builder.addCase(getCompanyByIsin.pending, (state) => {
            state.companyLoading = true
        });
        builder.addCase(getCompanyByIsin.fulfilled, (state, action) => {
            state.company = action.payload
            state.companyLoading = false
        });
        builder.addCase(getCompanyByIsin.rejected, (state, action) => {
            state.companyError = action.error.message
            state.companyLoading = false
        });

        builder.addCase(addCompany.pending, (state) => {
            state.companyLoading = true
        });
        builder.addCase(addCompany.fulfilled, (state, action) => {
            state.company = action.payload
            state.companies.push(action.payload)
            state.companyLoading = false
        });
        builder.addCase(addCompany.rejected, (state, action) => {
            state.companyError = action.error.message
            state.companyLoading = false
        });

        builder.addCase(updateCompany.pending, (state) => {
            state.companyLoading = true
        });
        builder.addCase(updateCompany.fulfilled, (state, action) => {
            state.company = action.payload
            const index = state.companies.findIndex(company => company.id === action
                .payload.id)
            state.companies[index] = action.payload
            state.companyLoading = false
        });
        builder.addCase
        (updateCompany.rejected, (state, action) => {
            state.companyError = action.error.message
            state.companyLoading = false
        });
    }
})

export const { clearCompanies } = appCompanySlice.actions

export default appCompanySlice.reducer
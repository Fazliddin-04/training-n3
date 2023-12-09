import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const CURRENT_DAY = moment().format("YYYY-MM-DD 05:00:00");
const NEXT_DAY = moment().add(1, "day").format("YYYY-MM-DD 05:00:00");
const ONE_DAY_BEFORE = moment()
  .subtract(1, "day")
  .format("YYYY-MM-DD 05:00:00");
const CURRENT_HOUR = moment().get("hour");

const initialState = {
  // Order table
  external_order_id: "",
  tab: "986a0d09-7b4d-4ca9-8567-aa1c6d770505",
  dateRange: {
    start_date: CURRENT_HOUR < 5 ? ONE_DAY_BEFORE : CURRENT_DAY,
    end_date: CURRENT_HOUR < 5 ? CURRENT_DAY : NEXT_DAY,
  },
  customer_id: "",
  is_open: false,
  branches: null,
  courier_id: null,
  statuses: null,
  delivery_type: null,
  payment_method: null,
  // Track couriers
  routeMode: false,
};

export const { actions: filterActions, reducer: filtersReducer } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setExternalOrderId(state, { payload }) {
      state.external_order_id = payload;
    },
    setDateRange(state, { payload }) {
      state.dateRange = payload;
    },
    setCustomerId(state, { payload }) {
      state.customer_id = payload;
    },
    setTabId(state, { payload }) {
      state.tab = payload;
    },
    openFilters(state, { payload }) {
      state.is_open = payload;
    },
    setBranches(state, { payload }) {
      state.branches = payload;
    },
    setCourierId(state, { payload }) {
      state.courier_id = payload;
    },
    setStatuses(state, { payload }) {
      state.statuses = payload;
    },
    setDeliveryType(state, { payload }) {
      state.delivery_type = payload;
    },
    setPaymentMethod(state, { payload }) {
      state.payment_method = payload;
    },
    setRouteMode(state, { payload }) {
      state.routeMode = payload;
    },
    clearFilters(state, { payload }) {
      state = payload;
    },
  },
});

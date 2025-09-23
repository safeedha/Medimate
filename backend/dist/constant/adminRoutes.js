"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ROUTES = void 0;
exports.ADMIN_ROUTES = {
    AUTH: {
        LOGIN: "/login",
        LOGOUT: "/logout",
    },
    DEPARTMENT: {
        BASE: "/department",
        BY_ID: (id) => `/department/${id}`,
        BLOCK: (id) => `/department/${id}`,
    },
    DOCTOR: {
        BASE: "/doctor",
        UNVERIFIED: "/doctor/unverified",
        BY_ID: (id) => `/doctor/${id}`,
        STATUS: (id) => `/doctor/status/${id}`,
        VERIFY: (id) => `/doctor/verify/${id}`,
    },
    USER: {
        BASE: "/user",
        STATUS: (id) => `/user/status/${id}`,
        BY_ID: (id) => `/user/${id}`,
    },
    APPOINTMENT: {
        BASE: "/appoinment",
        COUNT: "/appoinment/count",
        FILTER: "/appoinment/filter",
        DEPARTMENT_SUMMARY: "/department_summary",
    },
    WALLET: {
        BASE: "/wallet",
        PAY_INFO: "/wallet/pay",
        PAY: "/wallet/pay",
    },
};

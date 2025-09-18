export const ADMIN_ROUTES = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
  },

  DEPARTMENT: {
    BASE: "/department",
    BY_ID: (id: string | ":id") => `/department/${id}`,
    BLOCK: (id: string | ":id") => `/department/${id}`,
  },

  DOCTOR: {
    BASE: "/doctor",
    UNVERIFIED: "/doctor/unverified",
    BY_ID: (id: string | ":doctorid") => `/doctor/${id}`,
    STATUS: (id: string | ":id") => `/doctor/status/${id}`,
    VERIFY: (id: string | ":id") => `/doctor/verify/${id}`,
  },

  USER: {
    BASE: "/user",
    STATUS: (id: string | ":id") => `/user/status/${id}`,
    BY_ID: (id: string | ":id") => `/user/${id}`,
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

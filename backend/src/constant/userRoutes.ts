export const USER_ROUTES = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
    GOOGLE_LOGIN: "/googlelogin",
    LOGOUT: "/logout",
    SEND_OTP: "/sendotp",
    VERIFY_OTP: "/verifyotp",
    RESET_PASSWORD: "/reset",
  },

  DEPARTMENT: "/department",

  DOCTOR: {
    LIST: "/doctors",
    SORT: "/doctors/sort",
    BY_ID: (id: string | ":id") => `/doctor/${id}`,
    MESSAGE_TIME: (receiver: string | ":reciever") => `/doctor/${receiver}`,
    SLOT_BY_ID: (id: string | ":id") => `/doctor/slot/${id}`,
  },

  USER: {
    PROFILE: "/profile",
  },

  PAYMENT: {
    BOOK_APPOINTMENT: "/bookappoinment",
    VERIFY_PAYMENT: "/verify-payment",
  },

  MESSAGE: {
    ROOT: "/messages",
    BY_ID: (id: string | ":messageid") => `/messages/${id}`,
    UNREAD_COUNT: "/messages/unread-counts",
  },

  APPOINTMENT: {
    CREATE: "/createappoinment",
    FUTURE: "/appointments/future",
    LOCK_SLOT: "/lockslot",
    PAGE: "/page",
    CANCEL: "/appointment",
    REPORT: (appId: string | ":appId") => `/report/${appId}`,
  },

  REVIEW: {
    ROOT: "/review",
    COUNT: "/review/count",
  },

  NOTIFICATION: {
    ROOT: "/notification",
  },

  WALLET: {
    ROOT: "/wallet",
  },
};

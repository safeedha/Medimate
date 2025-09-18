export const DOCTOR_ROUTES = {
  PROFILE: {
    BASE: "/",
    UPDATE: "/update",
  },

  AUTH: {
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REAPPLY: "/reapply",
    SEND_OTP: "/sendotp",
    VERIFY_OTP: "/verifyotp",
    RESET_PASSWORD: "/reset",
  },

  DEPARTMENT: {
    UNBLOCKED: "/department",
    ALL: "/department/all",
  },

  MESSAGE: {
    BASE: "/messages",
    BY_ID: (id: string | ":messageid") => `/messages/${id}`,
    UNREAD_COUNTS: "/messages/unread-counts",
  },

  REPORT: {
    ADD: "/report",
  },

  WALLET: {
    BASE: "/wallet",
  },

  USER: {
    BASE: "/user",
    UPDATE_MESSAGE_TIME: (receiver: string | ":reciever") => `/doctor/${receiver}`,
  },

  APPOINTMENT: {
    BASE: "/appoinment",
    COUNT: "/appoinment/count",
    FILTER: "/appoinment/filter",
    FOLLOWUP: "/appoinment/followup",
    RESCHEDULE: "/appoinment/reshedule",
    CANCEL: (id: string | ":id", userId: string | ":userid") => `/appoinment/${id}/${userId}`,
    COMPLETE: (id: string | ":id") => `/appoinment/${id}`,
    BY_ID: (id: string | ":id") => `/appoinment/${id}`,
    PAGINATION: "/page",
  },

  SLOT: {
    BASE: "/slots",
    BY_SLOT_ID: (slotId: string | ":slotid") => `/slots/${slotId}`,
    RECURRING: {
      BASE: "/slot/recurring",
      CREATE: "/slot/recurring",
      EDIT: (recId: string | ":recId") => `/slot/recurring/${recId}`,
      DELETE: (id: string | ":id") => `/slots/recurring/${id}`,
      GET_BY_DOCTOR_ID : `/slots/recurring`,
    },
  },
};

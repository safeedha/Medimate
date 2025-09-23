"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCTOR_ROUTES = void 0;
exports.DOCTOR_ROUTES = {
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
        BY_ID: (id) => `/messages/${id}`,
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
        UPDATE_MESSAGE_TIME: (receiver) => `/doctor/${receiver}`,
    },
    APPOINTMENT: {
        BASE: "/appoinment",
        COUNT: "/appoinment/count",
        FILTER: "/appoinment/filter",
        FOLLOWUP: "/appoinment/followup",
        RESCHEDULE: "/appoinment/reshedule",
        CANCEL: (id, userId) => `/appoinment/${id}/${userId}`,
        COMPLETE: (id) => `/appoinment/${id}`,
        BY_ID: (id) => `/appoinment/${id}`,
        PAGINATION: "/page",
    },
    SLOT: {
        BASE: "/slots",
        BY_SLOT_ID: (slotId) => `/slots/${slotId}`,
        RECURRING: {
            BASE: "/slot/recurring",
            CREATE: "/slot/recurring",
            EDIT: (recId) => `/slot/recurring/${recId}`,
            DELETE: (id) => `/slots/recurring/${id}`,
            GET_BY_DOCTOR_ID: `/slots/recurring`,
        },
    },
};

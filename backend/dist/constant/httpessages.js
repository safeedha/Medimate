"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMessage = void 0;
exports.HttpMessage = {
    REGISTRATION_SUCCESS: 'Registration successful',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logged out successfully',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    GOOGLE_LOGIN_ERROR: 'Unexpected error occurred during Google login',
    OTP_SENT_SUCCESS: 'OTP sent successfully',
    OTP_VERIFIED_SUCCESS: 'OTP verified successfully',
    INVALID_OR_EXPIRED_OTP: "Invalid or expired OTP",
    PASSWORD_RESET_SUCCESS: 'Password reset successful',
    INVALID_RECEIVER: 'Valid sender (receiverId) is required',
    INVALID_SENDER_OR_RECEIVER: 'Invalid sender or receiver',
    USER_FETCH_SUCCESS: 'User fetched successfully',
    USER_UPDATE_SUCCESS: 'User updated successfully',
    PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
    WALLET_ADDED_SUCCESS: 'Money added',
    NOTIFICATION_READE: 'Notification readed',
    INVALID_STATUS: 'Invalid status value',
    MISSING_FIELDS: 'Missing status, start, or end date',
    REFRESH_TOKEN_MISSING: "Refresh token is missing",
    REFRESH_TOKEN_FAILED: "Refresh token failed",
    INVALID_REFRESH_TOKEN: "Invalid refresh token payload",
};

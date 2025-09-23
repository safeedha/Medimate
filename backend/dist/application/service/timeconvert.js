"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTo12HourFormat = convertTo12HourFormat;
function convertTo12HourFormat(time) {
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
}

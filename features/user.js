"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialstatevalue = {
    username: "",
    accesstoken: "",
    firstName: "",
    lastName: "",
    refreshtoken: "",
    userid: "",
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState: { value: initialstatevalue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialstatevalue;
        }
    }
});
exports.login = exports.userSlice.actions.login;
exports.default = exports.userSlice.reducer;

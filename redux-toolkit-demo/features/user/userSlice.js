const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

//createAsyncThunk takes 2 args. first is the action name. 2nd is the callback function to create the payload
//createAsyncThunk automatically creates promises: pending, fulfilled or rejected action types
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/uhsers")
    .then((response) => response.data.map((user) => user.id));
  // .catch();// dont need catch block because error will be handled already
});

const userSlice = createSlice({
  name: "user",
  initialState,
  //need extraReducers to listen to action types created by createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;

import { TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const columns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "email",
    headerName: "E-Mail",
    width: 130,
  },
];

export default function Search() {
  const [allUsers, setAllUsers] = React.useState([]);
  const [load, setLoaded] = React.useState(false);
  React.useEffect(() => {
    getAllUsers();
    SetOnLoad();
  }, []);

  const SetOnLoad = () => {
    setLoaded(true);
  };

  // Get user accounts
  async function getAllUsers() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/profiles/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAllUsers(data);
  }

  const [state, setstate] = useState({
    query: "",
    list: [],
  });

  const handleChange = (e) => {
    setLoaded(false);
    const results = allUsers.filter((user) => {
      if (e.target.value === "") return allUsers;
      return user.firstName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "5em",
        marginLeft: "5em",
      }}
    >
      <Typography variant="h4">Search Users</Typography>
      <TextField
        autoFocus
        margin="dense"
        id="search"
        label="Search"
        fullWidth
        variant="outlined"
        name="search"
        value={state.query}
        onChange={handleChange}
      />
      <div style={{ height: 400, width: "100%", marginTop: "2em" }}>
        {load === true ? (
          <div>
            <DataGrid
              rows={allUsers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        ) : (
          <div>
            <DataGrid
              rows={state.list}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

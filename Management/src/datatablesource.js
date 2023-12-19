export const userColumns = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.img !== ""
              ? params.row.img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const mechanicColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.img !== ""
              ? params.row.img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "point",
    headerName: "Point",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "group",
    headerName: "Group",
    headerAlign: "center",
    flex: 1,
  },
];
export const accountantColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src="https://img.freepik.com/premium-vector/cute-boy-thinking-cartoon-avatar_138676-2439.jpg"
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
];
export const serviceColumns = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    flex: 0.5,
  },
];
export const serviceColumns2 = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 0.2 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 0.3,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    flex: 0.2,
  },
];
export const formColumn = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "service",
    headerName: "Service Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    headerAlign: "center",
  },
];
export const garageColumn = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "openTime",
    headerName: "Open Time",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "closeTime",
    headerName: "Close Time",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "bank",
    headerName: "Bank",
    flex: 1,
    headerAlign: "center",
  },
];

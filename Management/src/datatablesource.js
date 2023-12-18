export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
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
//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

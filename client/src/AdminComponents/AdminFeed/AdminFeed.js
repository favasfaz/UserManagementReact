import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import swal from 'sweetalert';
import axios from "axios";
import { Container } from "@mui/system";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import App from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};
const loadingStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function AdminFeed() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminToken");
    if (!auth) {
      navigate("/admin");
    }
    setTimeout(() => {
      axios({
        url: "/admin/allUsers",
        method: "get",
      }).then((response) => {
        setUsers(response.data);
      });
      setLoading(false);
    }, 1000);
  }, [users]);

  const blockUser = (id) => {
    axios({
      url: `/admin/blockUser/${id}`,
      method: "get",
    });
  };

  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", {
          icon: "success",
        });
        axios({
          url: `/admin/deleteUser/${id}`,
          method: "get",
        });
        setUsers((users) => {
          return users.filter((users) => users._id !== id);
        });
      } 
    });
    
  };

  const unBlockUser = (id) => {
    axios({
      url: `/admin/unBlockUser/${id}`,
      method: "get",
    });
  };
const searchKeyword = () =>{}
  return (
    <div>
      {loading ? (
        <Grid item xs={3}>
          <Box sx={loadingStyle}>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="blue"
              secondaryColor="white"
            />
          </Box>
        </Grid>
      ) : (
        <Container>
          <Typography variant="h3" sx={{ textDecoration: "underline" }}>
            All Users
          </Typography>
          <Button
            sx={{ marginTop: "20px", marginBottom: "10px" }}
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
          >
            Add User
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "15pt", color: "darkblue" }}>
                    NO
                  </TableCell>
                  <TableCell sx={{ fontSize: "15pt", color: "darkblue" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontSize: "15pt", color: "darkblue" }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ fontSize: "15pt", color: "darkblue" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontSize: "15pt", color: "darkblue" }}>
                    Edition
                  </TableCell>
                  {/* <TableCell >Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                { users.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.status ? "true" : "false"}</TableCell>
                    <TableCell>
                      {row.status ? (
                        <RemoveCircleOutlineIcon
                          onClick={() => blockUser(row._id)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <BlockIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => unBlockUser(row._id)}
                        />
                      )}{" "}
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteUser(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateUser state={open} setState={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}

export default AdminFeed;

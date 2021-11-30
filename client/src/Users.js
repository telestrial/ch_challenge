import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@material-ui/core';

const Users = () => {
  const [limit, setLimit] = useState(10);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getUsers = async (limit, currentPage) => {
      await fetch(`/users?limit=${limit}&page=${currentPage}`)
        .then((res) => res.json())
        .then((res) => {
          const { pages, users } = res.data;
          setUserData(users);
          setTotalPages(pages);
        });
    };
    getUsers(limit, currentPage);
  }, [limit, currentPage]);

  const onPageChangeHandler = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const onRowsPerPageChangeHandler = (event) => {
    const newLimit = event.target.value;
    if (newLimit === -1) {
      setLimit(100);
      setCurrentPage(1);
    } else {
      setLimit(newLimit);
      setCurrentPage(1);
    }
  };

  return (
    <Container fixed>
      <Box display="flex" justifyContent="center">
        <Box my="3rem" bgcolor="white" borderRadius="5px" p="1.5rem">
          <h1>Users</h1>
          <TableContainer component={Paper}>
            <Table sx={{ overflow: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell aling="left">Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData &&
                  userData.map((user) => {
                    return (
                      <TableRow
                        key={user.email}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="left">{user.firstName}</TableCell>
                        <TableCell align="left">{user.lastName}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.password}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      25,
                      50,
                      { label: 'All', value: -1 },
                    ]}
                    count={limit * totalPages}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={onPageChangeHandler}
                    onRowsPerPageChange={onRowsPerPageChangeHandler}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Users;

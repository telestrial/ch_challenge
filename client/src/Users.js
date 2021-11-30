import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core';

const Users = () => {
  const [limit, setLimit] = useState(10);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getUsers = async (limit, currentPage) => {
      try {
        await fetch(`/users?limit=${limit}&page=${currentPage}`)
          .then((res) => res.json())
          .then((res) => {
            const { pages, users } = res.data;
            setUserData(users);
            setTotalPages(pages);
          });
      } catch (error) {}
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
    <Box display="flex" justifyContent="center">
      <Box my="3rem" bgcolor="white" borderRadius="5px" p="1.5rem" width="90%">
        <h1>Users</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{ display: 'block', width: '99%', overflowX: 'auto' }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell aling="left">Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!userData && <CircularProgress />}
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
                  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
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
  );
};

export default Users;

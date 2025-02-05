import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Card,
  Container,
  Typography,
  Stack,
  TablePagination,
} from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { getAllStudents, deleteStudent } from "../utils/firebase-db";
import StudentAddForm from "./student-add-form";
import StudentEditForm from "./student-edit-form";
import StudentView from "./student-view";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Students</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenAdd(true)}
        >
          Add Student
        </Button>
      </Stack>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="info"
                        onClick={() => {
                          setSelectedStudent(student);
                          setOpenView(true);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={() => {
                          setSelectedStudent(student);
                          setOpenEdit(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <StudentAddForm
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchStudents}
      />

      <StudentEditForm
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSuccess={fetchStudents}
      />

      <StudentView
        open={openView}
        onClose={() => {
          setOpenView(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </Container>
  );
}

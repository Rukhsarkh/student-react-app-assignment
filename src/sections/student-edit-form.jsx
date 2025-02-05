import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { updateStudent } from "../utils/firebase-db";

const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SECTIONS = ["A", "B", "C", "D"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function StudentEditForm({ open, onClose, student, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNumber: "",
    class: "",
    section: "",
    dateOfBirth: "",
    gender: "male",
    address: "",
    phoneNumber: "",
    parentName: "",
    email: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(student.id, formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Student</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              name="firstName"
              label="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              name="rollNumber"
              label="Roll Number"
              required
              type="number"
              value={formData.rollNumber}
              onChange={handleChange}
            />
            <TextField
              name="class"
              select
              label="Class"
              required
              value={formData.class}
              onChange={handleChange}
            >
              {CLASSES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="section"
              select
              label="Section"
              required
              value={formData.section}
              onChange={handleChange}
            >
              {SECTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              name="address"
              label="Address"
              multiline
              rows={3}
              required
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              name="parentName"
              label="Parent's Name"
              required
              value={formData.parentName}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="bloodGroup"
              select
              label="Blood Group"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              {BLOOD_GROUPS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Update Student
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

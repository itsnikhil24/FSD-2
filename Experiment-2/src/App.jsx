import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Rating,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Box,
  Paper
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

function App() {
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [agree, setAgree] = useState(false);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          mt: 6,
          borderRadius: 3,
          overflow: "hidden" // important for rounded header
        }}
      >
        {/* Colored Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            color: "#fff",
            py: 2.5,
            textAlign: "center"
          }}
        >
          <SchoolIcon fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            Nikhil's Form
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Student Registration
          </Typography>
        </Box>

        {/* Form Body */}
        <Box sx={{ p: 4 }}>
          {/* TextField */}
          <TextField
            label="Student Name"
            placeholder="Enter your name"
            fullWidth
            margin="normal"
          />

          {/* Select */}
          <Select
            fullWidth
            value={course}
            displayEmpty
            onChange={(e) => setCourse(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="">
              <em>Select Course</em>
            </MenuItem>
            <MenuItem value="CSE">Computer Science</MenuItem>
            <MenuItem value="IT">Information Technology</MenuItem>
            <MenuItem value="ECE">Electronics</MenuItem>
          </Select>

          {/* Rating */}
          <Box sx={{ mt: 3 }}>
            <Typography fontWeight={500} gutterBottom>
              Rate this UI
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          {/* Checkbox */}
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
            }
            label="I agree to the terms and conditions"
          />

          {/* Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!agree}
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;

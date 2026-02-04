import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";

export default function MuiForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.agree) newErrors.agree = "You must accept terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    /* 🌈 Gradient Background Wrapper */
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🧾 Form Card */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
          p: 4,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          MUI Registration Form
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />

        {/* Gender */}
        <FormControl
          error={!!errors.gender}
          margin="normal"
          sx={{ mt: 2 }}
        >
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          <Typography color="error" fontSize={12}>
            {errors.gender}
          </Typography>
        </FormControl>

        {/* ✅ Checkbox (fixed position & spacing) */}
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
            }
            label="I agree to the terms & conditions"
          />
          <Typography color="error" fontSize={12}>
            {errors.agree}
          </Typography>
        </Box>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

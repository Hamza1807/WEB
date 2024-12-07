const Appointment = require("../models/Appointment"); // Import Appointment model

// Add Appointment
const addAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Appointment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add appointment", error });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment", error });
  }
};

// Update Appointment
const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment", error });
  }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
};

module.exports = {
  addAppointment,
  deleteAppointment,
  updateAppointment,
  getAllAppointments,
};

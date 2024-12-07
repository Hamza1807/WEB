const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Fetch Health Data
exports.getHealthData = async (req, res) => {
  try {
    const healthData = await Patient.findById(req.user.id).select("medicalHistory healthMetrics");
    res.status(200).json({ success: true, healthData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching health data" });
  }
};

// Fetch Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

// Fetch Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user.id });
    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching prescriptions" });
  }
};

// Fetch Consultation History
exports.getConsultationHistory = async (req, res) => {
  try {
    const consultations = await Appointment.find({ patient: req.user.id, type: "video" });
    res.status(200).json({ success: true, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching consultation history" });
  }
};

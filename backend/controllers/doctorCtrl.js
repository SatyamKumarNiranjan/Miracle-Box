const doctorModel = require("../models/doctorModel");
// const volunteerModel = require('../models/volunteerModel');
const express = require("express");
const jwt = require("jsonwebtoken");
const sessionModel = require("../models/sessionsModel");
const communityModel = require("../models/communityModel");
const getAttendeesInfoController = async (req, res) => {
  try {
    const Attendee = await doctorModel.find({});
    console.log();
    res.status(200).send({
      success: true,
      message: "Attendee data fetch success",
      data: Attendee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

const getSearchedAttendeeController = async (req, res) => {
  console.log("Controler");
  try {
    const { phone } = req.body;
    const doctors = await doctorModel.find({ phone: phone });
    console.log();
    res.status(200).send({
      success: true,
      message: "Searched Attendee fetch success",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in searxching attendee Details",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const Attendee = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: Attendee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};
const markAttendanceController = async (req, res) => {
  try { 
    const { SessionId , AttendeeId } = req.body;    
    const attendee = await doctorModel.findByIdAndUpdate(
      AttendeeId,
      { $push: { sessionsAttended: { sessionId: SessionId, isBenefitted: "No" } } }
    ); 
    const Community = attendee.community;
    const session = await sessionModel.findByIdAndUpdate(
      SessionId, 
      {$push: { attendees: attendee._id , community: attendee.community }}
    ); 
    const community = await communityModel.findOneAndUpdate({name:Community} , 
      {$push: { attendees: attendee._id  ,  sessions: SessionId }}
      ); 
    
    // await attendee.save();
    res.status(201).send({
      success: true,
      message: "Attendance Updated",
      data: attendee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Attendance Marking",
      error,
    });
  }
};
const getDoctorByIdController = async (req, res) => {
  try {
    const Attendee = await doctorModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Single Attendee info Fetched",
      data: Attendee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single Attendee Info",
    });
  }
};
module.exports = {
  getAttendeesInfoController,
  getSearchedAttendeeController,
  updateProfileController,
  getDoctorByIdController, 
  markAttendanceController,
};

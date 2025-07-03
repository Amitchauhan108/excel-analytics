import Chart from "../models/Chart.js";
import mongoose from "mongoose";


// create chart

export const createChart = async (req,res) => {
    try{
        const chart = await Chart.create(req.body);
         res.status(201).json(chart);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
};

// Get all Charts

export const getAllCharts = async (req,res) =>{
    try{
        const charts = await Chart.find();
       res.status(500).json(charts);
    }
    catch(err){
       res.status(500).json({error: err.message});
    }
};

// Get chart by ID

export const getChartById = async (req, res) => {
  const { id } = req.params;

  // ✅ Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid chart ID" });
  }

  try {
    const chart = await Chart.findById(id);

    if (!chart) {
      return res.status(404).json({ success: false, message: "Chart not found" });
    }

    res.status(200).json(chart);
  } catch (err) {
    console.error("getChartById error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};




// Update chart
export const updateChart = async(req,res) =>{
    try{
        const chart = await Chart.findByIdAndUpdate(req.params.id, req.body,{new : true});
        if(!chart) return res.status(404).json({message : "Chart not found"});
        res.json(chart);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};



// delete chart

export const deleteChart = async (req, res) => {
  try {
    console.log("Attempting to delete chart with ID:", req.params.id);

    const deletedChart = await Chart.findByIdAndDelete(req.params.id);

    if (!deletedChart) {
      return res.status(404).json({ success: false, message: "Chart not found" });
    }

    res.status(200).json({ success: true, message: "Chart deleted successfully" });
  } catch (err) {
    console.error("deleteChart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

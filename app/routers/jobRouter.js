const express = require("express");
const router = new express.Router();
const Job = require("../models/jobSchema");

// get alll the jobs in the db
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({});
    if (!jobs) {
      return res.status(404).send({ error: "Not found" });
    }
    res.send(jobs);
  } catch (error) {
    res.status(500).send({ error: "Server Error" });
  }
});

// create a job listing
router.post("/jobs", async (req, res) => {
  //add a job to the database

  const job = new Job(req.body);
  try {
    if (!job) {
      return res.status(400).send({ error: "bad request" });
    }
    await job.save();
    console.log(job);
    res.status(201).send(job);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
});

// update a job listing

router.patch("/jobs/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "website ",
      "company",
      "job_desscription",
      "salary",
      "expirationDate",
      "location",
      "isRemote",
      "requirements",
    ];
    if (!updates.every((e) => allowedUpdates.includes(e))) {
      return res.status(400).send({ error: "not allowed update" });
    }
    const job = await Job.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      console.log("job not found ");
      return res.status(404).send({ error: "job not found" });
    }
    console.log(job);
    res.status(201).send(job);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "server error" });
  }
});

// delete a job

router.delete("/jobs/:id", async(req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)
    if(!job){
             console.log("job not found ");
      return res.status(404).send({ error: "job not found" });
    }
    console.log("deleted");
    res.send(job)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "server error" });
  }
});

module.exports = router;

const mongooose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongooose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: {
        amount: {
        type: String
        },
        currency: {
            type:
             String}
    }
     
  },
  job_description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  updatedDate:{
    type: Date,
    default: Date.now()
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val){
        if(!validator.isEmail(val)){
            throw new Error ({error: "wrong email format "})
        }
    }
  },
  isRemote: {
    type: Boolean,
    default: false,
  },

});
const Job = mongooose.model('Job', jobSchema)


module.exports = Job
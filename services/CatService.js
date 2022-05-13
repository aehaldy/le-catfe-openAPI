/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get all Cats
*
* returns List
* */
const getAllCats = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Post review of a Cat
*
* newReview NewReview 
* no response value expected for this operation
* */
const postCatReview = ({ newReview }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        newReview,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getAllCats,
  postCatReview,
};

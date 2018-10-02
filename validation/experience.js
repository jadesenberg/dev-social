const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    dataFields = ["title", "company", "from"];

    dataFields.forEach(field => {
        data[field] = !isEmpty(data[field]) ? data[field] : "";
        if (Validator.isEmpty(data[field])) {
            errors[field] = `${field} is required`;
        }
    });

    if (!Validator.isISO8601(data.from)) {
        errors.from = "Date format is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

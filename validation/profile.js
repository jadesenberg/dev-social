const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateProfileInput(data) {
    let errors = {};

    siteUrls = ["website", "youtube", "twitter", "facebook", "linkedin"];
    dataFields = ["handle", "status", "skills"];

    dataFields.forEach(field => {
        data[field] = !isEmpty(data[field]) ? data[field] : "";
        if (Validator.isEmpty(data[field])) {
            errors[field] = `${field} is required`;
        }
    });

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "Handle must be between 2 and 40 characters";
    }

    siteUrls.forEach(url => {
        data[url] = !isEmpty(data[url]) ? data[url] : "";

        if (!isEmpty(data[url])) {
            if (!Validator.isURL(data[url])) {
                errors[url] = `${url} has an invalid URL`;
            }
        }
    });

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

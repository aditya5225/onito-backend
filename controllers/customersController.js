const customerManagerDb = require('../models/customerManagerModel');

const fetchCustomersFun = async (req, res) => {
    let response = {};

    try {
        const limitData = req.query.limit && req.query.limit >= 0 ? req.query.limit : 10;
        const skipData = req.query.skip && req.query.skip >= 0 ? (req.query.skip - 1) * limitData : 0;

        const customersData = await customerManagerDb.find().skip(skipData).limit(limitData);
        const dataCount = await customerManagerDb.find().count();

        response = {
            error: false,
            result: {
                dataCount,
                customersData,
            }
        }
    }
    catch (err) {
        response = {
            error: true,
            message: err
        }
    }

    return response;
}

const fetchCustomers = async (req, res, next) => {
    let response = {};

    try {

        const customerData = await fetchCustomersFun(req, res);
        response = {
            error: false,
            ...customerData.result,
            message: `Data fetched successfully!`
        }
    }
    catch (err) {
        response = {
            error: true,
            message: err
        }
    }

    res.send(response);
    next()
}

const addCustomers = async (req, res, next) => {

    try {

        const newCustomerManager = new customerManagerDb({
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            mobile: req.body.mobile,
            emrg_num: req.body.emrg_num,
            email: req.body.email,
            blood_group: req.body.blood_group,
            marital_status: req.body.marital_status,
            occupation: req.body.occupation,
            religion: req.body.religion,
            nationality: req.body.nationality,
            document: {
                document_type: req.body.document_type,
                document_number: req.body.document_number,
            },
            guardian: {
                guardian_type: req.body.guardian_type,
                guardian_name: req.body.guardian_name,
            },
            address: {
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                pin_code: req.body.pin_code,
                state: req.body.state,
            },
        });

        newCustomerManager.save(async err => {
            if (err) {
                const response = {
                    error: true,
                    message: err
                }

                res.send(response);
                next()
            } else {
                const customerData = await fetchCustomersFun(req, res);
                const response = {
                    error: false,
                    ...customerData.result,
                    message: `Added successfully!`
                }

                res.send(response);
                next()
            }
        });
    }
    catch (err) {
        const response = {
            error: true,
            message: err
        }

        res.send(response);
        next()
    }
}

module.exports = {
    fetchCustomers,
    addCustomers,
}
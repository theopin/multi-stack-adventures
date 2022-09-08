
import ObjectsService from '../services/objects.service.js';

const insertData = (req, res) => {
    ObjectsService
        .clearData()
        .then((response) => {
            return res.status(200).json({
                status: true,
                response: "Cleared cache and database",
            });
        })
        .catch((errorObject) => {
            return res.status(500).json({message: "Failed to insert data"});
        });
};

const getDataFromDatabase = (req, res) => {
    const {id} = req.params;
    ObjectsService
        .getDataSetFromDatabase()
        .then((response) => {
            return res.status(200).json({
                status: true,
                message: response.message,
                response: response.results
            });
        })
        .catch((errorObject) => {
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

const getDataFromRedis = (req, res) => {
    ObjectsService
        .getDataSetFromRedis()
        .then((response) => {
            return res.status(200).json({
                status: true,
                message: response.message,
                response: response.results
            });
        })
        .catch((errorObject) => {
            console.log(101)
            console.log(errorObject)
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

export { insertData, getDataFromDatabase, getDataFromRedis }

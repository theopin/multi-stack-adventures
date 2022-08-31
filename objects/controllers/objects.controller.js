
import ObjectsService from '../services/objects.service.js';

const insertData = (req, res) => {
    ObjectsService
        .insertData()
        .then((response) => {
            return res.status(200).json({
                status: true,
                response: "Inserted data into MongoDB and Redis",
            });
        })
        .catch((errorObject) => {
            console.log(errorObject)
            return res.status(500).json({message: "Failed to insert data"});
        });
};

const getDataFromDatabase = (req, res) => {
    ObjectsService
        .getDataFromDatabase()
        .then((response) => {
            return res.status(200).json({
                status: true,
                response: "Retrieved data from Mongodb",
            });
        })
        .catch((errorObject) => {
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

const getDataFromRedis = (req, res) => {
    ObjectsService
        .getDataFromRedis()
        .then((response) => {
            return res.status(200).json({
                status: true,
                response: "Retrieved data from Redis",
            });
        })
        .catch((errorObject) => {
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

export { insertData, getDataFromDatabase, getDataFromRedis }

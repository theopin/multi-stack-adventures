
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
            return res.status(500).json({message: "Failed to insert data"});
        });
};

const getDataFromDatabase = (req, res) => {
    const {id} = req.params;
    ObjectsService
        .getDataSetFromDatabase(id)
        .then((response) => {
            return res.status(200).json({
                status: true,
                message: "Retrieved data from Mongodb",
                response
            });
        })
        .catch((errorObject) => {
            console.log(errorObject)
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

const getDataFromRedis = (req, res) => {
    ObjectsService
        .getDataSetFromRedis()
        .then((response) => {
            return res.status(200).json({
                status: true,
                message: "Retrieved data from Redis",
                response: JSON.parse(response)
            });
        })
        .catch((errorObject) => {
            return res.status(500).json({message: "Failed to retrieve data"});
        });
};

export { insertData, getDataFromDatabase, getDataFromRedis }

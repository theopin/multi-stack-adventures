
export default class Helper {
    static async deleteAll(Model) {
        return Model.deleteMany ({})
    };

    static async save(Model, data) {
        return Model.insertMany(data);
    };

    static async list(Model, query) { 
        return Model.find(query).exec(); 
    };
};


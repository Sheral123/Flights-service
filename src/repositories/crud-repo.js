const{ Logger } = require('../config');

class CrudRepo {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response
    }

  
    async destroy(data){
        try {
            const response = await this.model.destroy({
                where:{
                    id: data
                }
            })
            return response
        } catch (error) {
            Logger.error('something went wrong in the Crud Repo : destroy');
            throw error;
        }
    }    


    async get(data){
        try {
            const response = await this.model.findByPk(data);
            return response
        } catch (error) {
            Logger.error('something went wrong in the Crud Repo : get');
            throw error;
        }
    }    


    async getAll(){
        try {
            const response = await this.model.findAll();
            return response
        } catch (error) {
            Logger.error('something went wrong in the Crud Repo : get');
            throw error;
        }
    }    


    async update(id, data){
        try {
            const response = await this.model.update(data, {
                where:{
                    id: id
                }
            });
            return response
        } catch (error) {
            Logger.error('something went wrong in the Crud Repo : get');
            throw error;
        }
    }    

}

module.exports = CrudRepo;

import { API } from '../config/api.js'

export const CustomerService = {


    /**
     * Get Customers by search
     * @param {*} search 
     */
    getCustomerList(search, page) {
        return API.get(`api/crm/customers/se=${search}/?page=${page}`);
    },
    
    /**
     * Create Customer
     * @param {*} data 
     */
    create(data) {
        return API.post(`api/crm/customer`, data);
    },

    /**
     * Get Customer info by uuid
     * @param {*} uuid 
     */
    getCustomerInfo(uuid) {
        return API.get(`api/crm/${uuid}/customer`);
    },

    /**
     * Update Customer details
     * @param {*} uuid 
     * @param {*} data 
     */
    update(uuid, data) {
        return API.put(`api/crm/${uuid}/customer`, data);
    },

    /**
     * Delete Customer
     * @param {*} id 
     */
    delete(id) {
        return API.delete(`api/crm/${id}/customer`);
    },

    /**
     * Import Customers by Csv file
     * @param {*} data 
     */
    import(data) {
        return API.post(`api/crm/customers/import`, data);
    },


}




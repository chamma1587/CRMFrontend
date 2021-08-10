
import {API} from '../config/api.js'

export const AuthService = {    
  
    login(data) {
        return API.post('/api/auth/login', data);
    },

    logout(){
        return API.post('/api/auth/logout');
    }
}




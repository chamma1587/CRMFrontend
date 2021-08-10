import Axios from 'axios';
import {API_URL} from '@/config/setting.js'

export const API = Axios.create({  
    baseURL:API_URL,     
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'XMLHttpRequest': 'XMLHttpRequest',            
       Authorization: {
        toString () {
          return `Bearer ${localStorage.getItem('access_token')}`
        }
      }
     }
});
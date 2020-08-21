import axios from 'axios';
import { base_url } from '../config/domains';

export default axios.create({
    baseURL: base_url,
});
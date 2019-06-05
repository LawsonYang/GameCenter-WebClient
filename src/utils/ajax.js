/**
 * 包装
 * @param {*} config 
 * {
 *  url,
 *  param,
 *  success,
 *  error
 * }
 */
import axios from 'axios';
import qs from 'qs';
import { configInf } from '../../config';

export default function (config) {
    let url = config.url;
    let params = config.params;
    let success = config.success;
    let error = config.error;
    if (url) {
        axios.post(configInf.proxy + url, qs.stringify(params))
            .then(success)
            .catch((res) => {
                if (res.response) {
                    error(res.response);
                }
            })
    }

}
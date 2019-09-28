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

export default function(config) {
	let { url, params, success, error, checkToken = true } = config;
	if (checkToken) {
		params.userpk = sessionStorage.getItem('userpk');
		params.token = sessionStorage.getItem('token');
	}
	if (url) {
		axios
			.post(configInf.proxy + url, qs.stringify(params))
			.then((res) => {
				success(res.data);
			})
			.catch((res) => {
				if (res.response) {
					if (error && error instanceof Function) {
						error(res.response);
					} else {
						dealError(res.response);
					}
				}
			});
	}
}

function dealError(error) {
	console.log(error);
}

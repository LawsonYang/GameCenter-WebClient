import ajax from '../../utils/ajax';
import { showErrorInfo } from '../../utils/showInfo';
/**
 * 登录
*/
function login(username, password) {
	let params = {
		username: username,
		password: password
	};
	ajax({
		url: '/user/login',
		params: params,
		checkToken: false,
		success: (response) => {
			let data = response.data;
			if (response.success) {
				// 保存数据到sessionStorage
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('username', username);
				sessionStorage.setItem('userpk', data.userpk);
				this.props.history.push('/hello');
			}
		},
		error: (error) => {
			showErrorInfo(error);
		}
	});
}
/**
 * 注册
 */
function register() {
	this.props.history.push('/register', { isRegister: true });
}

export { login, register };

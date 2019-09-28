import { configInf } from '../../../config';
import { alterInfo } from '../../utils/showInfo';
const { scoketProxy } = configInf;

function createScoket(config, callBack) {
	let { onConnect, onMeassage, onClose } = config;
	//从session中获取用户和token
	let userId = sessionStorage.getItem('userpk');
	let token = sessionStorage.getItem('token');
	let sock = new SockJS(scoketProxy + '?user=' + userId + '&token=' + token);
	sock.onopen = () => {
		if (onConnect) {
			onConnect();
		} else {
			alterInfo('连接成功');
		}
		callBack();
	};
	sock.onmessage = (e) => {
		if (onMeassage) {
			onMeassage(e.data);
		} else {
			alterInfo('返回:' + e.data);
		}
	};
	sock.onclose = () => {
		if (onClose) {
			onClose();
		} else {
			alterInfo('连接关闭');
		}
	};
	return sock;
}

const constance = {
	CREATE: 'create ',
	JOIN: 'join '
};

export { createScoket, constance };

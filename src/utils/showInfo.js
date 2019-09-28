import { notification } from 'antd';
/**
 * 显示错误信息
 */
function showErrorInfo(message) {
	notification['error']({
		message: '错误',
		description: message,
		onClick: () => {}
	});
}
/**
 * 显示正常提示信息
 */
function alterInfo(message) {
	notification['success']({
		message: '提示',
		description: message,
		onClick: () => {}
	});
}

export { showErrorInfo, alterInfo };

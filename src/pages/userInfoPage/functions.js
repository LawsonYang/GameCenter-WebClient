import ajax from '../../utils/ajax';
import { showErrorInfo } from '../../utils/showInfo';
/**
 * 取消注册，返回登录页面
 */
function cancel() {
	if (this.state.isRegister) {
		this.props.history.push('/login');
	} else {
		this.setState({
			isEdit: false
		});
		//重置表格数据
		this.props.form.resetFields();
	}
}
/**
 * 注册
 */
function register(values) {
	//如果有主键是修改，没有是注册
	let { username, password } = values;
	let params = {
		username,
		password
	};
	ajax({
		url: '/user/register',
		params: params,
		checkToken: false,
		success: (response) => {
			if (response.success) {
				this.props.form.setFieldsValue(response.data.valueIndex);
				this.setState({
					isEdit: false
				});
			}
		},
		error: (error) => {
			showErrorInfo(error);
		}
	});
}
/**
 * 更新数据
 * @param {} values 
 */
function modify(values) {
	let params = values;
	ajax({
		url: '/user/modify',
		params: params,
		success: (response) => {
			if (response.success) {
				this.props.form.setFieldsValue(response.data.valueIndex);
				this.setState({
					isEdit: false
				});
			}
		},
		error: (error) => {
			showErrorInfo(error);
		}
	});
}
/**
 * 查询用户全部信息
 */
function queryUserInfo() {
	ajax({
		url: '/user/queryUserInfo',
		params: {},
		success: (response) => {
			if (response.success) {
				this.props.form.setFieldsValue(response.data.valueIndex);
				this.setState({
					isEdit: false
				});
			}
		},
		error: (error) => {
			showErrorInfo(error);
		}
	});
}
/**
 * 修改
 */
function edit() {
	this.setState({
		isEdit: true
	});
}

export { cancel, register, edit, queryUserInfo, modify };

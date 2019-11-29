import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { cancel, register, edit, queryUserInfo, modify } from './functions';
import './index.less';
/**
 * 用户信息修改，注册页面
 */
class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		const params = this.props.location.state;
		this.state = {
			isRegister: params.isRegister, //是否是注册
			isEdit: params.isRegister ? true : false, //注册的时候默认编辑，其他状态默认浏览
			username: params.username //用户信息
		};
	}

	componentDidMount() {
		//如果不是注册进来的查询用户全部信息
		if (!this.state.isRegister) {
			queryUserInfo.call(this);
		}
	}
	onSubmit = (e) => {
		let _this = this;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (_this.state.isRegister) {
					register.call(this, values);
				} else {
					modify.call(this, values);
				}
			}
		});
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isEdit, isRegister } = this.state;
		/**
         * 表单样式
         */
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		return (
			<div className="userPage_userInfo">
				<Form {...formItemLayout} onSubmit={this.onSubmit.bind(this)}>
					<Form.Item label="code">
						{getFieldDecorator('pk', {
							rules: []
						})(<Input disabled={true} />)}
					</Form.Item>
					<Form.Item label="UserName">
						{getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: 'Please input your userName!'
								}
							]
						})(<Input disabled={!(isEdit && isRegister)} />)}
					</Form.Item>
					<Form.Item label="Password" hasFeedback>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: 'Please input your password!'
								}
							]
						})(<Input.Password disabled={!isEdit} />)}
					</Form.Item>
					{isEdit && (
						<Form.Item label="Confirm Password" hasFeedback>
							{getFieldDecorator('confirm', {
								rules: [
									{
										required: true,
										message: 'Please confirm your password!'
									},
									{
										validator: this.compareToFirstPassword
									}
								]
							})(<Input.Password disabled={!isEdit} />)}
						</Form.Item>
					)}
					<Form.Item label="UserType">
						{getFieldDecorator('usertype', {})(<Input disabled={!(isEdit && isRegister)} />)}
					</Form.Item>
					<Form.Item label="Grade">
						{getFieldDecorator('grade', {})(<Input disabled={!(isEdit && isRegister)} />)}
					</Form.Item>
					<Form.Item label="Ts">
						{getFieldDecorator('ts', {})(<Input disabled={!(isEdit && isRegister)} />)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						{getFieldDecorator('captcha', {
							rules: [ { required: true, message: 'Please input the captcha you got!' } ]
						})(
							<Checkbox disabled={!isEdit}>
								I have read the <a href="">agreement</a>
							</Checkbox>
						)}
					</Form.Item>
					{isEdit ? (
						<Form.Item {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit" className="bottom-buttton">
								{isRegister ? '注册' : '保存'}
							</Button>
							<Button className="bottom-buttton" onClick={cancel.bind(this)}>
								取消
							</Button>
						</Form.Item>
					) : (
						!isRegister && (
							<Form.Item {...tailFormItemLayout}>
								<Button type="primary" className="bottom-buttton" onClick={edit.bind(this)}>
									修改
								</Button>
							</Form.Item>
						)
					)}
				</Form>
			</div>
		);
	}
}
UserInfo = Form.create()(UserInfo);
export default UserInfo;

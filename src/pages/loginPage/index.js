import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ajax from '../../utils/ajax'
import { Form, Icon, Input, Button } from 'antd';
import './index.less';
const FormItem = Form.Item;
/**
 * 登陆页面
 */
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.sock;
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let { userCode, password } = values;
            this.login(userCode, password)
        });
    }

    login = (username, password) => {
        let params = {
            username: username,
            password: password
        };
        ajax({
            url: "/login",
            params: params,
            success: (response) => {
                let data = response.data;
                console.log(data);
                if (data.result && data.result == 'success') {
                    if (data.token) {
                        // 保存数据到sessionStorage
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('username', username);
                    }
                    this.props.history.push('/hello', { username: username });
                }
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className='loginForm'>
            <Form onSubmit={this.onSubmit}>
                <FormItem>
                    {getFieldDecorator('userCode', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="userCode" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="password" />
                    )}
                </FormItem>
                <FormItem className='button-item'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className='bottom-buttton'
                    >
                        登录
                    </Button>
                    <Button className='bottom-buttton'>
                        注册
                    </Button>
                </FormItem>
            </Form>
        </div>
    }
}
const WrappedLogin = Form.create()(Login);

export default WrappedLogin
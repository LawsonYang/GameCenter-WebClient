import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { login, register } from './functions'
import './index.less';
const FormItem = Form.Item;
/**
 * 登陆页面
 */
class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { userCode, password } = values;
                login.call(this, userCode, password)
            }
        });
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
                    <Button className='bottom-buttton' onClick={register.bind(this)}>
                        注册
                    </Button>
                </FormItem>
            </Form>
        </div>
    }
}
const WrappedLogin = Form.create()(Login);

export default WrappedLogin
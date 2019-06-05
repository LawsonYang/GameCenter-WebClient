import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ajax from '../../utils/ajax'
import { Form, Icon, Input, Button } from 'antd';
import './index.less'
/**
 * cmd测试
 */
class CMD extends React.Component {
    constructor(props) {
        super(props);
        this.sock;
        this.state = {
            value: '',
            output: []
        }
    }

    scoketTest() {
        this.sock.send(this.state.value);
    }

    scoketTestClose() {
        this.sock.close();
    }

    scoketTestCreate() {
        if (!this.scok) {
            //从session中获取用户和token
            let userId = sessionStorage.getItem('username');
            let token = sessionStorage.getItem('token');
            this.sock = new SockJS('http://127.0.0.1:8081/sock-js?user=' + userId + '&token=' + token);
            this.sock.onopen = () => {
                this.consoleLog('连接成功');
            };
            this.sock.onmessage = (e) => {
                this.consoleLog('返回:' + e.data);
            };
            this.sock.onclose = () => {
                this.consoleLog('连接关闭');
            };
        }
    }

    consoleLog(value) {
        let output = this.state.output
        output.push(value);
        this.setState({
            output
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className='cmd'>
            <div className='cmd-head'>
                <Button className='head-buttton' onClick={this.scoketTestCreate.bind(this)}>
                    connect
                </Button>
                <Button className='head-buttton' onClick={this.scoketTestClose.bind(this)}>
                    close
                </Button>
                <Button className='head-buttton' onClick={() => {
                    this.setState({
                        output: []
                    })
                }}>
                    clean
                </Button>
            </div>
            <div className='cmd-body'>
                <Input className='value-input' value={this.state.value} onChange={(event) => {
                    this.setState({
                        value: event.target.value
                    })
                }} />
                <Button className='send-buttton' onClick={this.scoketTest.bind(this)}>
                    send
                </Button>
            </div>
            <div>
                {
                    this.state.output.map((item) => {
                        return <p> {item}</p>
                    })
                }
            </div>
        </div>
    }
}
CMD = Form.create()(CMD);

export default CMD
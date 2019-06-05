import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ajax from '../../utils/ajax';
const { Header, Footer, Sider, Content } = Layout;
import './index.less'
/**
 * 首页
 * 主要显示已安装的应用和其他信息
 */
class HelloPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state,
            loginUsers: []
        }
    }

    componentDidMount() {
        let username = sessionStorage.getItem('username');
        if (username) {
            this.setState({
                username: username
            }, this.queryLoginUsers.bind(this))
        } else {
            //跳转到登录页面
            this.props.history.push('/login');
        }

    }

    queryLoginUsers() {
        //查询所有已登录用户,顺便验证用户是否登录
        let token = sessionStorage.getItem('token');
        let params = {
            username: this.state.username,
            token
        };
        ajax({
            url: "/queryLoginUsers",
            params: params,
            success: (response) => {
                let data = response.data;
                this.setState({ loginUsers: data });
                console.log(data);
            },
            error: (error) => {
                console.log(error);
                //跳转到登录页面
                this.props.history.push('/login');
            }
        })
    }

    /**
     * 获取用户列表
     */
    getUserList() {
        let userList = this.state.loginUsers;
        return userList.map((item) => {
            return <div>
                <img style={{ width: '30px', height: '30px' }} />
                {item}
            </div>
        })
    }
    /**
     * 获取用户有权限的App
     */
    getAppList() {
        let appList = [{ appName: '拍分', url: '/paifen' }, { appName: 'cmd', url: '/cmd' }];
        return (
            <ul className='app-list'>
                {appList.map((item) => {
                    return <li className='app-item'>
                        <img style={{ width: '120px', height: '120px' }} onClick={() => {
                            this.props.history.push(item.url);
                        }} />
                        <div className='app-name'>{item.appName}</div>
                    </li>
                })}
            </ul>
        )
    }





    render() {
        return (
            <Layout className="layout">
                <Header className="hello-header">
                    <div className="header-left"> Game Room </div>
                    <div className="header-right">
                        <img style={{ width: '20px', height: '20px' }} />
                        {this.state.username}
                        <a> 退出 </a>
                    </div>
                </Header>
                <Layout style={{ padding: '0 50px' }}>
                    <Content>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {this.getAppList()}
                        </div>
                    </Content>
                    <Sider>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            <div style={{ 'text-align': 'center', padding: '5px 0' }}>在线用户</div>
                            {this.getUserList()}
                        </div>
                    </Sider>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    Game-Room ©2016 Created by lawson yang
                </Footer>
            </Layout>
        )
    }
}

export default HelloPage;
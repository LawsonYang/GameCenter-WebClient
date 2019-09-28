import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { linkToUserInfo, queryLoginUsers, logout, queryAllGames } from './functions';
import './index.less';
/**
 * 首页
 * 主要显示已安装的应用和其他信息
 */
class HelloPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// ...this.props.location.state,
			loginUsers: [],
			gameList: []
		};
	}

	componentDidMount() {
		let username = sessionStorage.getItem('username');
		if (username) {
			this.setState({
				username: username
			});
			queryLoginUsers.call(this);
			queryAllGames.call(this);
		} else {
			//跳转到登录页面
			this.props.history.push('/login');
		}
	}

	/**
     * 获取用户列表
     */
	getUserList() {
		let userList = this.state.loginUsers;
		return userList.map((item) => {
			return (
				<div>
					{/* <img style={{ width: '30px', height: '30px' }} /> */}
					{item.username}
				</div>
			);
		});
	}
	/**
     * 获取用户有权限的App
     */
	getAppList() {
		let appList = [ { appName: '拍分', url: '/paifen' }, { appName: 'cmd', url: '/cmd' } ];
		return (
			<ul className="app-list">
				{appList.map((item) => {
					return (
						<li className="app-item">
							<img
								style={{ width: '120px', height: '120px' }}
								onClick={() => {
									this.props.history.push(item.url);
								}}
							/>
							<div className="app-name">{item.appName}</div>
						</li>
					);
				})}
			</ul>
		);
	}

	getGameList() {
		return (
			<ul className="app-list">
				{this.state.gameList.map((item) => {
					return (
						<li className="app-item">
							<img
								style={{ width: '120px', height: '120px' }}
								onClick={() => {
									this.props.history.push('/gf', { gameCode: item.key });
								}}
							/>
							<div className="app-name">{item.key + ' ' + item.type}</div>
						</li>
					);
				})}
				<li className="app-item">
					<img
						style={{ width: '120px', height: '120px' }}
						onClick={() => {
							this.props.history.push('/gf', { isCreate: true });
						}}
					/>
					<div className="app-name">创建游戏</div>
				</li>
			</ul>
		);
	}

	render() {
		return (
			<Layout className="layout">
				<Header className="hello-header">
					<div className="header-left"> Game Room </div>
					<div className="header-right">
						{/* <img style={{ width: '20px', height: '20px' }} /> */}
						<a onClick={linkToUserInfo.bind(this)}>{this.state.username}</a>
						<a onClick={logout.bind(this)}> 退出 </a>
					</div>
				</Header>
				<Layout style={{ padding: '0 50px' }}>
					<Content>
						<div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
							{this.getAppList()}
							{this.getGameList()}
						</div>
					</Content>
					<Sider>
						<div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
							<div style={{ 'text-align': 'center', padding: '5px 0' }}>在线用户</div>
							{this.getUserList()}
						</div>
					</Sider>
				</Layout>
				<Footer style={{ textAlign: 'center' }}>Game-Room ©2016 Created by lawson yang</Footer>
			</Layout>
		);
	}
}

export default HelloPage;

import React from 'react';
import { Button, notification } from 'antd';

// import { getCards } from '../base/index';
import './index.less';
import { createScoket, getCards, getPersons } from '../base';
import { ORDER } from '../base/const';
import { dealMessage, onAddClick, onFollowClick, onGiveOutClick } from './functions';

export default class GF extends React.Component {
	constructor(props) {
		super(props);
		const state = this.props.location.state;
		this.isCreate = state && state.isCreate; //是否是创建游戏
		this.gameCode = state && state.gameCode; //当前游戏对局编码
		this.sock; //当前的连接
		this.state = {
			myCards: [],
			enableButtons: []
		};
	}

	componentDidMount() {
		//创建scoket连接
		if (!this.scok) {
			this.initScoket();
		}
	}

	initScoket() {
		this.sock = createScoket(
			{
				//响应服务器的消息
				onMeassage: dealMessage.bind(this)
			},
			() => {
				if (this.isCreate) {
					//创建连接
					this.sock.send(ORDER.CREATE + 'gf');
					// sessionStorage.setItem('isScok', true);
				} else {
					this.sock.send(ORDER.JOIN + this.gameCode);
				}
			}
		);
	}

	/**
     * 获取按钮
     */
	getButtons() {
		return this.state.enableButtons.map((item) => {
			return this.getButton(item);
		});
	}

	getButton(key) {
		if (key == 'add') {
			return <Button onClick={onAddClick.bind(this)}>加倍</Button>;
		} else if (key == 'follow') {
			return <Button onClick={onFollowClick.bind(this)}>跟牌</Button>;
		} else if (key == 'giveup') {
			return <Button onClick={onGiveOutClick.bind(this)}>弃牌</Button>;
		}
	}

	getMyCards() {
		return getCards(this.state.myCards);
	}

	getOthers() {
		let others = [
			{
				name: '张三',
				cards: [ {}, {}, {} ]
			},
			{
				name: '张三',
				cards: [ { number: '1', color: '1' }, { number: '2', color: '1' }, { number: '3', color: '4' } ]
			}
		];
		return getPersons(this.state.otherPlayers);
	}

	render() {
		return (
			<div className="paifen">
				<div className="title">砸金花</div>
				<div className="others"> {this.getOthers()}</div>
				<div className="toolsbar">{this.getButtons()}</div>
				<div className="mycards">
					{this.getMyCards()}
					{/* <Card number={'2'} color={'2'} /> */}
				</div>
			</div>
		);
	}
}

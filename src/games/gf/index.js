import React from 'react';
import { Button, notification } from 'antd';

// import { getCards } from '../base/index';
import './index.less';
import { createScoket, getCards, getPersons } from '../base';
import { ORDER } from '../base/const';
import { dealMessage, onAddClick, onFollowClick, onGiveOutClick, onPrePare } from './functions';

export default class GF extends React.Component {
	constructor(props) {
		super(props);
		const state = this.props.location.state;
		this.isCreate = state && state.isCreate; //是否是创建游戏
		this.gameCode = state && state.gameCode; //当前游戏对局编码
		this.sock; //当前的连接
		this.state = {
			otherPlayers: [],
			myCards: [],
			enableButtons: [],
			isPreparing: false,
			isOver: false,
			gameOverInfo: ''
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
		return getPersons(this.state.otherPlayers);
	}

	/**
	 * 未准备
	 */
	renderUnPrepared = () => {
		return (
			<div className="toolsbar">
				<Button onClick={onPrePare.bind(this)}>准备</Button>
			</div>
		);
	};
	/**
	 * 游戏中
	 */
	renderGameing = () => {
		return (
			<div>
				<div className="toolsbar">{this.getButtons()}</div>
				<div className="mycards">{this.getMyCards()}</div>
			</div>
		);
	};

	/**
	 * 游戏结束
	 */
	renderGameOver = () => {
		return (
			<div className="toolsbar">
				{this.state.gameOverInfo}
				<Button
					onClick={() => {
						//重置页面状态
						this.scok = null;
						this.isCreate = true;
						this.setState(
							{
								otherPlayers: [],
								myCards: [],
								enableButtons: [],
								isPreparing: false,
								isOver: false,
								gameOverInfo: ''
							},
							() => {
								if (!this.scok) {
									this.initScoket();
								}
							}
						);
					}}
				>
					再来一局
				</Button>
			</div>
		);
	};

	render() {
		return (
			<div className="paifen">
				<div className="title">砸金花</div>
				{this.state.isOver ? (
					this.renderGameOver()
				) : (
					<div>
						<div className="others"> {this.getOthers()}</div>
						{this.state.isPreparing ? this.renderGameing() : this.renderUnPrepared()}
					</div>
				)}
			</div>
		);
	}
}

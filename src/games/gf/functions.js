import { RETURNORDER, SPLITCHAR, ORDER } from '../base/const';
import { alterInfo } from '../../utils/showInfo';
/**
 * 处理服务器饭回来的信息
 * @param {*} message 
 */
function dealMessage(message) {
	const returnOrder = message.split(SPLITCHAR.orderSplit)[0];
	const paramString = message.split(SPLITCHAR.orderSplit)[1];
	const params = paramString && paramString.split(SPLITCHAR.paramSplit);
	alterInfo(message);
	switch (returnOrder) {
		//创建游戏成功
		case RETURNORDER.CREATEGAMESUCCESS:
			createSuccess.call(this, params[0]);
			break;
		case RETURNORDER.SHOWCARDS:
			showUserCards.call(this, params);
			break;
		case RETURNORDER.SHOWUSEROPRS:
			showUserOprs.call(this, params);
			break;
		case RETURNORDER.SHOWOTHERSINFO:
			showOtherPlays.call(this, params);
			break;
		case RETURNORDER.GAMEOVER:
			gameOver.call(this, params);
			break;
	}
}
/**
 * 创建游戏成功
 * @param {*} gameCode 
 */
function createSuccess(gameCode) {
	this.gameCode = gameCode;
}
/**
 * 显示用户手里的卡片
 */
function showUserCards(params) {
	let myCards = params.map((param) => {
		let color = param.split(SPLITCHAR.cardSplit)[0];
		let number = param.split(SPLITCHAR.cardSplit)[1];
		if (color && number) {
			return {
				number,
				color
			};
		}
	});
	this.setState({
		myCards
	});
}
/**
 * 显示用户可执行的操作按钮
 * @param {*} params 
 */
function showUserOprs(params) {
	this.setState({
		enableButtons: params
	});
}
/**
 * 显示所有其他玩家
 * @param {x} params 
 */
function showOtherPlays(params) {
	let otherPlayers = params.map((param) => {
		let name = param.split(SPLITCHAR.playerNameSplit)[0];
		let cards = param.split(SPLITCHAR.playerNameSplit)[1];
		if (name && cards) {
			let playCards = cards.split(SPLITCHAR.palyerCardSplit).map((param) => {
				let color = param.split(SPLITCHAR.cardSplit)[0];
				let number = param.split(SPLITCHAR.cardSplit)[1];
				if (color && number) {
					return {
						number,
						color
					};
				}
			});
			return {
				name,
				cards: playCards
			};
		}
	});
	this.setState({
		otherPlayers: otherPlayers
	});
}
/**
 * 新增按钮事件
 */
function onAddClick() {
	this.sock.send(ORDER.ORDER + ' ' + this.gameCode + ' add');
}
/**
 * 跟牌
 */
function onFollowClick() {
	this.sock.send(ORDER.ORDER + ' ' + this.gameCode + ' follow');
}
/**
 * 弃牌
 */
function onGiveOutClick() {
	this.sock.send(ORDER.ORDER + ' ' + this.gameCode + ' giveup');
}
/**
 * 准备
 */
function onPrePare() {
	this.sock.send(ORDER.PREPARE + ' ' + this.gameCode);
	this.setState({
		isPreparing: true
	});
}

function addDefaultUser() {
	this.sock.send(ORDER.ADDDEFAULT + ' ' + this.gameCode);
}
/**
 * 一局游戏结束
 */
function gameOver(params) {
	let score = params[0];
	let winUserpk = params[1];
	let thisUserpk = sessionStorage.getItem('userpk');
	let message;
	if (winUserpk == thisUserpk) {
		message = '恭喜您，游戏获胜，分数+' + score;
	} else {
		message = '对不起，游戏失败，分数-' + score + '。胜利玩家：' + winUserpk;
	}

	this.setState({
		isOver: true,
		gameOverInfo: message
	});
}

export { dealMessage, onAddClick, onFollowClick, onGiveOutClick, onPrePare, addDefaultUser };

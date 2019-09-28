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
		return {
			number,
			color
		};
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

export { dealMessage, onAddClick, onFollowClick, onGiveOutClick };

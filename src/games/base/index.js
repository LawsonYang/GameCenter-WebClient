import React from 'react';
import { configInf } from '../../../config';
import { alterInfo } from '../../utils/showInfo';
import HalfCard from '../../component/halfcard';
import Card from '../../component/card';
import Person from '../../component/person';
const { scoketProxy } = configInf;
/**
 * 创建scoket连接
 */
function createScoket(config, callBack) {
	let { onConnect, onMeassage, onClose } = config;
	//从session中获取用户和token
	let userId = sessionStorage.getItem('userpk');
	let token = sessionStorage.getItem('token');
	let sock = new SockJS(scoketProxy + '?user=' + userId + '&token=' + token);
	sock.onopen = () => {
		if (onConnect) {
			onConnect();
		} else {
			alterInfo('连接成功');
		}
		callBack();
	};
	sock.onmessage = (e) => {
		if (onMeassage) {
			onMeassage(e.data);
		} else {
			alterInfo('返回:' + e.data);
		}
	};
	sock.onclose = () => {
		if (onClose) {
			onClose();
		} else {
			alterInfo('连接关闭');
		}
	};
	return sock;
}

/**
 * 根据获取卡片信息
 * @param {*} cards 
 */
function getCards(cards) {
	return cards.map((item, index) => {
		if (index < cards.length - 1) {
			return <HalfCard number={item.number} color={item.color} />;
		} else {
			return <Card number={item.number} color={item.color} />;
		}
	});
}

function getPersons(persons) {
	if (persons) {
		return persons.map((item) => {
			return <Person name={item.name} cards={item.cards} />;
		});
	}
}

export { createScoket, getCards, getPersons };

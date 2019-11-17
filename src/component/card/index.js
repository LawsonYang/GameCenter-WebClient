import React from 'react';
import './index.less';
/**
 * 扑克牌
 */
export default class Card extends React.Component {
	getColor(color) {
		switch (color) {
			case '1':
				return '♧';
				break;
			case '2':
				return '♢';
				break;
			case '3':
				return '♤';
				break;
			case '4':
				return '❤';
				break;
			default:
				return '';
		}
	}

	getNum(number) {
		switch (number) {
			case '11':
				return 'J';
				break;
			case '12':
				return 'Q';
				break;
			case '13':
				return 'K';
				break;
			case '14': //王
				return '王';
				break;
			default:
				return number;
		}
	}

	render() {
		let { number, color } = this.props;
		return (
			<div className="card">
				<div className="numbertop">{this.getNum(number)}</div>
				<div className="midcolor">{this.getColor(color)}</div>
				<div className="numberbottom">{this.getNum(number)}</div>
			</div>
		);
	}
}

import React from 'react';
import './index.less';
/**
 * 扑克牌
 */
export default class HalfCard extends React.Component {
	getColor(color) {
		if (!color) {
			return;
		}
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
		if (!number) {
			return;
		}
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
			case '0':
				return;
				break;
			default:
				return number;
		}
	}

	render() {
		let { number, color } = this.props;
		return (
			<div className="halfcard">
				<div className="number">{this.getNum(number)}</div>
				<div className="color">{this.getColor(color)}</div>
			</div>
		);
	}
}

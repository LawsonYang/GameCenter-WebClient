import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { getCards } from '../../games/base';
import { getUserNameByPk } from '../../utils/userInfo';
/**
 * 一个玩家
 */
export default class Person extends React.Component {
	getCards(cards) {}

	render() {
		let { name, url, cards } = this.props;
		return (
			<div className="person">
				<div className="userInfo">
					<span>{getUserNameByPk(name)}</span>
				</div>
				<div className="cards">{getCards(cards)} </div>
			</div>
		);
	}
}
// Person.propTypes = {
//     name: PropTypes.string,
//     img: PropTypes.string,
//     cards: PropTypes.array
// };

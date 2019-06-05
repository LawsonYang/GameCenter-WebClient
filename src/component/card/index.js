import React from 'react';
import ReactDOM from 'react-dom';
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
                return ''
        }
    }

    render() {
        let { number, color } = this.props;
        return (
            <div className="card">
                <div className="numbertop">{number}</div>
                <div className="midcolor">
                    {this.getColor(color)}
                </div>
                <div className="numberbottom">{number}</div>
            </div>
        )
    }

}
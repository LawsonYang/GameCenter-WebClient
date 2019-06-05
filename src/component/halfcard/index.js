import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
/**
 * 扑克牌
 */
export default class HalfCard extends React.Component {

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
            <div className="halfcard">
                <div className="number">{number}</div>
                <div className="color">
                    {this.getColor(color)}
                </div>
            </div>
        )
    }

}
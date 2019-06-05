import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import Card from '../../component/card'
import HalfCard from '../../component/halfcard'
import './index.less'

export default class PaiFen extends React.Component {
    /**
     * 获取按钮
     */
    getButtons() {
        return (
            <div>
                <Button>
                    弃牌
                </Button>
                <Button>
                    跟牌
                </Button>
                <Button>
                    加倍
                </Button>
            </div>)
    }

    getMyCards() {
        let myCards = [{ number: '1', color: '1' }, { number: '2', color: '1' }, { number: '3', color: '4' }]
        return myCards.map((item) => {
            return <HalfCard number={item.number} color={item.color} />
        })

    }

    getOthers() {
        let others = [{ name: '张三', cards: [{ number: '1', color: '1' }, { number: '2', color: '1' }, { number: '3', color: '4' }] }, {}];
        return others.map((item) => {

        })
    }

    render() {
        return (
            <div className='paifen'>
                <div className='others'>

                </div>
                <div className='toolsbar'>
                    {this.getButtons()}
                </div>
                <div className='mycards'>
                    {this.getMyCards()}
                    <Card number={'2'} color={'2'} />
                </div>
            </div>
        )
    }

}
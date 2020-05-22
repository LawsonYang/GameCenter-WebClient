import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Input, Button, Row, Col, Select, Space } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import './index.less';
/**
 * 游戏策略页面
 */
class BPPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const columns = [
			{
				title: 'Code',
				dataIndex: 'code',
				key: 'code',
				render: (text) => <a>{text}</a>
			},
			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type'
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => <a>Delete</a>
			}
		];

		const data = [
			{
				key: '1',
				code: 'John Brown',
				type: 32
			},
			{
				key: '2',
				code: 'Jim Green',
				type: 42
			},
			{
				key: '3',
				code: 'Joe Black',
				type: 32
			}
		];

		let onSubmit = (e) => {
			// let _this = this;
			// e.preventDefault();
			// this.props.form.validateFields((err, values) => {
			//     if (!err) {
			//         if (_this.state.isRegister) {
			//             register.call(this, values);
			//         } else {
			//             modify.call(this, values);
			//         }
			//     }
			// });
		};

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			}
		};
		const textItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		return (
			<Row className="dbpage">
				<Col span={12}>
					<Row className="head-button-area">
						<Button type="primary">新增</Button>
					</Row>
					<Table columns={columns} dataSource={data} bordered={true} />
				</Col>
				<Col span={12}>
					<Form {...formItemLayout} onSubmit={onSubmit.bind(this)}>
						<Form.Item label="code">
							{getFieldDecorator('code', {
								rules: [
									{
										required: true,
										message: 'Please input code!'
									}
								]
							})(<Input disabled={false} />)}
						</Form.Item>
						<Form.Item label="type">
							{getFieldDecorator('type', {})(
								<Select
									// onChange={onGenderChange}
									allowClear
								>
									<Option value="gf">gf</Option>
									<Option value="other">other</Option>
								</Select>
							)}
						</Form.Item>
						<Form.Item label="text" {...textItemLayout}>
							{getFieldDecorator('text', {})(<TextArea rows={20} />)}
						</Form.Item>

						<Form.Item {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit" className="bottom-buttton">
								保存
							</Button>
							{/* <Button className="bottom-buttton">
								{/* // onClick={cancel.bind(this)} */}
							{/*	取消
							</Button> */}
						</Form.Item>
					</Form>
				</Col>
			</Row>
		);
	}
}
BPPage = Form.create()(BPPage);

export default BPPage;

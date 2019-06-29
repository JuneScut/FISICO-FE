import React from 'react'
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Form, Select, Button, Table, Row, Col} from 'antd';
import './style.scss';
const { Option } = Select;

const columns=[
    {
        title: '序号',
        dataIndex: 'order',
    },
    {
        title: '合同编号',
        dataIndex: 'id',
    },
    {
        title: '合同发起人',
        dataIndex: 'id',
    },
    {
        title: '签署时间',
        dataIndex: 'signTime',
    },
    {
        title: '货物名称',
        dataIndex: 'goodsName',
    },
    {
        title: '货物数量（件）',
        dataIndex: 'goodsNum',
    },
    {
        title: '货物金额（元）',
        dataIndex: 'goodsValue',
    },
    {
        title: '物流状态',
        dataIndex: 'logisticsStatus',
    },
    {
        title: '物流公司',
        dataIndex: 'logistics',
    },
    {
        title: '入库时间',
        dataIndex: 'inTime',
    },
    {
        title: '操作',
        dataIndex: 'operate',
    }
];
const data = [
    {
        key: '1',
        order: '1',
    },
    {
        key: '1',
        order: '2',
    },
    {
        key: '1',
        order: '3',
    },
];


class InWarehouse extends React.Component{
    /*constructor(props) {
        super(props);
        list: [],
    }*/

    state = {
        selectedRowKeys: [],
    };
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 1 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };
        /*const { selectedRowKeys } = this.state;*/
        // const rowSelection = {
        //     /*selectedRowKeys,*/
        //     onChange: this.onSelectedRowKeysChange,
        // };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout}  labelAlign="left">
                        <Form.Item label="合同编号">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </header>

                <Table
                   /* rowSelection={rowSelection}*/
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                />

                {/*<main>
                    <Table dataSource={this.state.list} columns={this.state.columns} />;
                </main>*/}




            </Card>
        )
    }
}

export default InWarehouse;
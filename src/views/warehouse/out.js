import React from 'react'
import { Card, Form, Select, Button, Table ,Row, Col} from 'antd';
import './style.scss';
const { Option } = Select;

const columns=[
    {
        title: '序号',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: '合同编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '发起时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
    },
    {
        title: '收货公司',
        dataIndex: 'getCompany',
        key: 'getCompany',
    },
    {
        title: '签署时间',
        dataIndex: 'signTime',
        key: 'signTime',
    },
    {
        title: '合同状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '货物名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
    },
    {
        title: '货物数量（件）',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
    },
    {
        title: '货物金额（元）',
        dataIndex: 'goodsValue',
        key: 'goodsValue',
    },
    {
        title: '保险公司',
        dataIndex: 'Insurance',
        key: 'Insurance',
    },
    {
        title: '出库状态',
        dataIndex: 'outStatus',
        key: 'outStatus',
    },
    {
        title: '物流公司',
        dataIndex: 'logisticsStatus',
        key: 'logisticsStatus',
    },
    {
        title: '出库时间',
        dataIndex: 'inTime',
        key: 'inTime',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
    },
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
class OutWarehouse extends React.Component{
    /*  constructor(props){
          super(props);
          this.state = {
              list: [],
              columns: [
                  {
                      title: '序号',
                      dataIndex: 'order',
                      key: 'order',
                  },
                  {
                      title: '合同编号',
                      dataIndex: 'id',
                      key: 'id',
                  },
                  {
                      title: '发起时间',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '收货公司',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '签署时间',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '合同状态',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '货物名称',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '货物数量（件）',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '货物金额（元）',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '保险公司',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '出库状态',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '物流公司',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '出库时间',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
                  {
                      title: '操作',
                      dataIndex: 'beginTime',
                      key: 'beginTime',
                  },
              ]
          }
      }*/
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout}>
                        <Form.Item label="出库状态">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>未出库</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>已出库</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="收货公司">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
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


            </Card>
        )
    }
}

export default OutWarehouse;
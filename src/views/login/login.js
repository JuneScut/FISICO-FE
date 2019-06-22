import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import {Form, Icon, Input, Card,Button,notification,} from 'antd';
import "./style.scss"
import createHistory from 'history/createHashHistory'

const FormItem = Form.Item
const history = createHistory()

class NormalLoginForm extends React.Component {
    handleSubmit(){
        this.openNotificationWithIcon('info')
    }
    

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <UserLayout>
                <div className="loginpagewrap">
                    <div className="box">
                <header className="header">区块链供应链金融平台</header>
                    <div className="loginWrap">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="loginBtn">
                            Login
                        </Button>
                    </Form>
                    </div>
                    </div>
                </div>
            </UserLayout>
        )
    }
}
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
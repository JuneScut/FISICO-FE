import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import {Form, Icon, Input,Button,} from 'antd';
import styles from "./style.module.scss"
// import {setAuth} from '../../utils/authority'

const roles = ['enterprise','supplier','bank','insuranceCompany','transportation','retailer']
class NormalLoginForm extends React.Component {
    handleLogin = () => {
        this.props.form.validateFields(err => {
            if(!err){
                this.validate()
            }
        })
    }

    validate = () => {
        let {username, password} = this.props.form.getFieldsValue();
        // console.log(username, password)
        if(username===password && roles.find((item)=>item===username)){
            // console.log('login')
            // setAuth(username);
            window.localStorage.setItem('role', username);
            window.location = window.location.origin + '/console'
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <UserLayout>
                <div className={styles.loginpagewrap}>
                    <div className={styles.box}>
                <header className={styles.header}>区块链供应链金融平台</header>
                    <div className={styles.loginWrap}>
                    <Form className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入您的用户名' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的密码' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginBtn} onClick={this.handleLogin}>
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
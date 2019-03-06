import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';

//CSS
import 'antd/dist/antd.css';
import './login-form.css'
import logo from '../../static/logo.png'


export default class LoginForm extends React.Component {

    state = {
        username: null,
        password: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(e);
                this.props.loginButtonOnClick(values.userName, values.password);
            }
        })
    };

    forgotPasswordHandler = () => {
        message.warning('Feature not implemented yet.')
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="logo">
                    <img alt="logo" src={logo} className="logo-image"/>
                    <h3>Little Bird of Lord Varys</h3>
                </div>
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" onClick={this.forgotPasswordHandler} href="#">Forgot password</a>
                    <br/>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Log in
                    </Button>
                    <br/>
                    Or
                    <br/>
                    <Button onClick={this.props.regButtonOnclick}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
}
import React from 'react';
import {Form, Button, Input, Icon, Alert} from 'antd';

//CSS
import 'antd/dist/antd.css';

export default class RegisterForm extends React.Component{

    state = {
        registrationSuccess: false,
        registrationError: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.regOnClick(values.firstName, values.lastName, values.email, values.password, values.userName);
                if(this.props.regError === false) this.setState({registrationSuccess: true})
            }
        })
    };

    compareToPassword = (rule, value, callback) => {
        const form = this.props.form;
        if(value && value !== form.getFieldValue('password')){
            callback("Passwords don't match!")
        } else {
            callback()
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your First Name!' }],
                    })(
                        <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your Last Name!' }],
                    })(
                        <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your Username!' }],
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
                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: 'Please input your Password Again!' }, {validator: this.compareToPassword}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{backgroundColor: "#00dd62", border: "#00a620"}}>
                        Register
                    </Button>
                </Form.Item>
                {/*<Form.Item>*/}
                    {/*{this.state.registrationError?<Alert message="Registration Error" type="error" showIcon />:null}*/}
                    {/*{this.state.registrationSuccess?<Alert message="Registration Successful" type="success" showIcon />:null}*/}
                {/*</Form.Item>*/}
            </Form>
        )
    }
}
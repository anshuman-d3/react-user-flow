import React from 'react';
import {Drawer, Form} from 'antd';

import LoginForm from "../../components/login-form";
import RegisterForm from "../../components/registration-form";

//CSS
import "./welcome-page.css"

const LoginFormPage = Form.create({name: 'normal_login'})(LoginForm);
const RegisterFormPage = Form.create({name: 'normal_register'})(RegisterForm);

export default class WelcomePage extends React.Component{

    state = {
        registrationForm: false,
    };

    registerButtonOnClickHandler = () => {
        this.setState({registrationForm:true})
    };

    registerCloseButtonOnClickHandler = () => {
        this.setState({registrationForm:false})
    };

    registerFormDrawer = () => {
        return(
            <Drawer
                title="Create a new account"
                width={360}
                onClose={this.registerCloseButtonOnClickHandler}
                visible
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}
                className="drawer"
            >
                <RegisterFormPage
                    regOnClick={(firstName, lastName, email, password, username) =>
                        this.props.onRegister(firstName, lastName, email, password, username)}
                    regError={this.props.regError}
                />
            </Drawer>
        )
    };

    render() {
        return(
            <div className={"login-form-page"}>
                {this.state.registrationForm? this.registerFormDrawer(): null}
                <div className={"form-container"}>
                    <div className={"login-form"}>
                        <LoginFormPage
                            loginButtonOnClick={(username, password) =>
                                this.props.onLogin(username, password)}
                            regButtonOnclick={this.registerButtonOnClickHandler}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
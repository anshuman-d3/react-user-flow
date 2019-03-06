import React from 'react';
import {Button, Layout, Menu, message} from 'antd';
import axios from 'axios';
import thrones_1 from '../../static/gifs/thrones-1.gif';
import thrones_2 from '../../static/gifs/thrones-2.gif';
import thrones_3 from '../../static/gifs/thrones-3.gif';


//CSS
import './user-page.css'
import {CURRENT_SERVER} from "../../CurrentServer";

const { Header, Content, Footer } = Layout;


export default class UserPage extends React.Component{

    sendReminderMailHandler = () => {
        message.loading("Sending email to " + this.props.email);
        const token = localStorage.getItem('token');
        axios.get(CURRENT_SERVER + "send_mail", {headers:{Authorization:token}})
            .then(resp=>{
                console.log(resp.request.status);
                if (resp.request.status === 202){
                    message.success("Email successfully sent to " + this.props.email);
                }
            })
            .catch(() => message.error("Email sending failed to " + this.props.email));
    };

    logOutButtonHandler = () => {
        this.props.onLogout();
    };

    render() {
        return(
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: 'inherit' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '50px' }}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div className="content-div">
                        <div className="content">
                            <h3 className="name">Hi, {this.props.firstName}</h3>
                            <br/>
                            <h3>April is coming.</h3>
                            <h3 className="tagline">For The  Throne</h3>
                            <Button htmlType="submit" onClick={this.sendReminderMailHandler}>Send Reminder to Email</Button>
                        </div>
                        <div className="images-div">
                            <img alt="thrones" src={thrones_1} className="image"/>
                            <img alt="thrones" src={thrones_2} className="image"/>
                            <img alt="thrones" src={thrones_3} className="image"/>
                        </div>
                    </div>
                    <Button htmlType="submit" type="danger" onClick={this.logOutButtonHandler}>Log Out</Button>
                </Content>
                <Footer style={{ textAlign: 'center' }} className="footer">
                    Designed by Anshuman. GIF credits to Eran Mendel.
                </Footer>
            </Layout>
        )
    }
}
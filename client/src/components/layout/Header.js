import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import "../../css/Header.css";
import "../../css/App.css";

class Header extends Component {
    constructor() {
        super();

        this.state = {
            homekey: "1"
        };
    }

    componentWillMount() {
        const pathname = this.props.location.pathname;
        var homekey;

        switch (pathname) {
            case "/":
                homekey = "1";
                break;
            case "/profiles":
                homekey = "2";
                break;
            case "/register":
                homekey = "3";
                break;
            case "/login":
                homekey = "4";
                break;
            default:
                break;
        }

        this.setState({ homekey });
    }

    onChangeHomekey = key => {
        this.setState({ homekey: key });
    };

    renderNav() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Col span={12}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                    className="auth-menu header-nav"
                    selectedKeys={[`${this.state.homekey}`]}
                >
                    <Menu.Item key="3">
                        <Link
                            to="/register"
                            onClick={e => this.onChangeHomekey("3")}
                        >
                            Register
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link
                            to="/Login"
                            onClick={e => this.onChangeHomekey("4")}
                        >
                            Login
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
        );

        const logoutLinks = (
            <Col span={12}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                    className="auth-menu header-nav"
                    selectedKeys={[`${this.state.homekey}`]}
                >
                    <Menu.Item key="5">
                        <Link
                            to="/profile"
                            onClick={e => this.onChangeHomekey("5")}
                        >
                            <img
                                src={user.avatar}
                                alt={user.name}
                                title="gravatar"
                                style={{
                                    width: "25px",
                                    marginRight: "10px",
                                    borderRadius: "13px"
                                }}
                            />
                            Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="0">
                        <a href="" onClick={this.onLogout}>
                            Logout
                        </a>
                    </Menu.Item>
                </Menu>
            </Col>
        );

        return isAuthenticated ? logoutLinks : authLinks;
    }

    onLogout = e => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    };

    render() {
        return (
            <Layout.Header>
                <Row>
                    <Col span={12}>
                        <div className="logo">
                            <h2 className="logo-name">
                                <Link
                                    to="/"
                                    className="logo-name"
                                    onClick={e => this.onChangeHomekey("1")}
                                >
                                    dev&lt;s&gt;ocial
                                </Link>
                            </h2>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[`${this.state.homekey}`]}
                            style={{ lineHeight: "64px" }}
                            className="header-nav"
                        >
                            <Menu.Item key="1">
                                <Link
                                    to="/"
                                    onClick={e => this.onChangeHomekey("1")}
                                >
                                    Home
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link
                                    to="/profiles"
                                    onClick={e => this.onChangeHomekey("2")}
                                >
                                    Developers
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    {this.renderNav()}
                </Row>
            </Layout.Header>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
    withRouter(Header)
);

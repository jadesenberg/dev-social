import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Button, Layout, Alert } from "antd";
import TextInput from "../common/TextInput";
import { loginUser } from "../../actions/authActions";

import "../../css/Register.css";
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    handleFormChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(user);
    };

    render() {
        const { errors } = this.state;
        return (
            <Layout.Content className="register-container layout-content">
                <div style={{ height: 50 }} />
                <div className="register-form">
                    <h1>Login Form</h1>
                    {errors.login ? (
                        <Alert
                            message={errors.login}
                            type="error"
                            showIcon
                            style={{ marginBottom: 10 }}
                        />
                    ) : (
                        ""
                    )}
                    <Form onSubmit={this.handleSubmit} className="">
                        <TextInput
                            validateStatus={errors.email}
                            help={errors.email}
                            placeholder="Email"
                            onChange={this.handleFormChange}
                            name="email"
                            value={this.state.email}
                        />

                        <TextInput
                            validateStatus={errors.password}
                            help={errors.password}
                            placeholder="Password"
                            onChange={this.handleFormChange}
                            name="password"
                            value={this.state.password}
                            type="password"
                        />

                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Login
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Layout.Content>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { loginUser })(Login);

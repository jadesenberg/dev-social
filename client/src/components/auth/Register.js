import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Layout } from "antd";
import TextInput from "../common/TextInput";

import { registerUser } from "../../actions/authActions";

import "../../css/Register.css";

const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    handleFormChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <Layout.Content className="register-container layout-content">
                <div style={{ height: 50 }} />
                <div className="register-form">
                    <h1>Registration Form</h1>
                    <Form onSubmit={this.handleSubmit} className="">
                        <TextInput
                            validateStatus={errors.name}
                            help={errors.name}
                            placeholder="Name"
                            onChange={this.handleFormChange}
                            name="name"
                            value={this.state.name}
                        />

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

                        <TextInput
                            validateStatus={errors.password2}
                            help={errors.password2}
                            placeholder="onfirm Password"
                            onChange={this.handleFormChange}
                            name="password2"
                            value={this.state.password2}
                            type="password"
                        />

                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Register
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextInput from "../common/TextInput";
import Textarea from "../common/Textarea";
import PropTypes from "prop-types";
import moment from "moment";

import { addExperience } from "../../actions/profileActions";

import { Row, Col, Form, Button, DatePicker, Checkbox } from "antd";
const FormItem = Form.Item;

class AddExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: "",
            title: "",
            location: "",
            from: moment().format("YYYY-MM-DD"),
            to: moment().format("YYYY-MM-DD"),
            current: false,
            description: "",
            errors: {},
            disabled: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    handleFormChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeDateFrom = (date, datestring) => {
        this.setState({ from: datestring });
    };

    onChangeDateTo = (date, datestring) => {
        this.setState({ to: datestring });
    };

    onCheckCurrent = e => {
        this.setState({
            current: !this.state.current,
            disabled: !this.state.disabled,
            to: ""
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addExperience(expData, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="add-experience-container">
                <Row>
                    <Col
                        sm={{ span: 24 }}
                        md={{ span: 8, offset: 8 }}
                        lg={{ span: 8, offset: 8 }}
                    >
                        <Link to="/dashboard">
                            <Button type="dashed" icon="arrow-left">
                                back to dashboard
                            </Button>
                        </Link>
                        <h1 style={{ textAlign: "center" }}>Add Experience</h1>
                        <small>* requied fields</small>

                        <Form onSubmit={this.handleSubmit} className="">
                            <TextInput
                                validateStatus={errors.company}
                                help={errors.company}
                                placeholder="Comapny"
                                onChange={this.handleFormChange}
                                name="company"
                                value={this.state.company}
                            />
                            <TextInput
                                validateStatus={errors.title}
                                help={errors.title}
                                placeholder="Job Title"
                                onChange={this.handleFormChange}
                                name="title"
                                value={this.state.title}
                            />
                            <TextInput
                                validateStatus={errors.location}
                                help={errors.location}
                                placeholder="Location"
                                onChange={this.handleFormChange}
                                name="location"
                                value={this.state.location}
                            />
                            <FormItem label="Date From">
                                <DatePicker
                                    onChange={this.onChangeDateFrom}
                                    name="from"
                                    defaultValue={moment(this.state.from)}
                                    validateStatus={errors.from}
                                    help={errors.from}
                                />
                            </FormItem>
                            <FormItem label="Date To">
                                <DatePicker
                                    onChange={this.onChangeDateTo}
                                    name="to"
                                    defaultValue={moment(this.state.from)}
                                    validateStatus={errors.to}
                                    help={errors.to}
                                    disabled={
                                        this.state.disabled ? true : false
                                    }
                                />
                            </FormItem>
                            <Checkbox
                                onChange={this.onCheckCurrent}
                                name="current"
                                value={this.state.current}
                                checked={this.state.current}
                            >
                                Current Job
                            </Checkbox>
                            <Textarea
                                validateStatus={errors.description}
                                help={errors.description}
                                extra="Tell us about your job"
                                placeholder="Job Description"
                                onChange={this.handleFormChange}
                                name="description"
                                value={this.state.description}
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
                    </Col>
                </Row>
            </div>
        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
    withRouter(AddExperience)
);

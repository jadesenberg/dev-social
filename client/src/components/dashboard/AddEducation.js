import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextInput from "../common/TextInput";
import Textarea from "../common/Textarea";
import PropTypes from "prop-types";
import moment from "moment";

import { addEducation } from "../../actions/profileActions";

import { Row, Col, Form, Button, DatePicker, Checkbox } from "antd";
const FormItem = Form.Item;

class AddEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            school: "",
            degree: "",
            fieldofstudy: "",
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
            disabled: !this.state.disabled
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="add-education-container">
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
                        <h1 style={{ textAlign: "center" }}>Add Education</h1>
                        <small>* requied fields</small>

                        <Form onSubmit={this.handleSubmit} className="">
                            <TextInput
                                validateStatus={errors.school}
                                help={errors.school}
                                placeholder="School"
                                onChange={this.handleFormChange}
                                name="school"
                                value={this.state.school}
                            />
                            <TextInput
                                validateStatus={errors.degree}
                                help={errors.degree}
                                placeholder="Degree"
                                onChange={this.handleFormChange}
                                name="degree"
                                value={this.state.degree}
                            />
                            <TextInput
                                validateStatus={errors.fieldofstudy}
                                help={errors.fieldofstudy}
                                placeholder="Field of study"
                                onChange={this.handleFormChange}
                                name="fieldofstudy"
                                value={this.state.fieldofstudy}
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
                                extra="Tell us about the program"
                                placeholder="Program Description"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
    withRouter(AddEducation)
);

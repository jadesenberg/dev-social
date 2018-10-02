import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Layout, Row, Col, Form, Button, Icon } from "antd";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectOption from "../common/SelectOption";
import Textarea from "../common/Textarea";
import isEmpty from "lodash.isempty";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
const FormItem = Form.Item;

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: ""
        };
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }

        if (prevProps.profile.profile !== this.props.profile.profile) {
            const profile = this.props.profile.profile;

            //bring skills array back to csv
            const skillsCSV = profile.skills.join(",");

            profile.company = !isEmpty(profile.company) ? profile.company : "";
            profile.website = !isEmpty(profile.website) ? profile.website : "";
            profile.location = !isEmpty(profile.location)
                ? profile.location
                : "";
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : "";
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : "";
            profile.linked = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : "";
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : "";
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : "";

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
        }
    }

    socialInputs = () => {
        const { errors, displaySocialInputs } = this.state;

        if (displaySocialInputs) {
            return (
                <div>
                    <TextInput
                        validateStatus={errors.twitter}
                        help={errors.twitter}
                        placeholder="Twitter URL"
                        onChange={this.handleFormChange}
                        name="twitter"
                        value={this.state.twitter}
                        prefix={
                            <Icon
                                type="twitter"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    />

                    <TextInput
                        validateStatus={errors.facebook}
                        help={errors.facebook}
                        placeholder="Facebook URL"
                        onChange={this.handleFormChange}
                        name="facebook"
                        value={this.state.facebook}
                        prefix={
                            <Icon
                                type="facebook"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    />

                    <TextInput
                        validateStatus={errors.linkedin}
                        help={errors.linkedin}
                        placeholder="Linkedin URL"
                        onChange={this.handleFormChange}
                        name="linkedin"
                        value={this.state.linkedin}
                        prefix={
                            <Icon
                                type="linkedin"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    />

                    <TextInput
                        validateStatus={errors.youtube}
                        help={errors.youtube}
                        placeholder="Youtube URL"
                        onChange={this.handleFormChange}
                        name="youtube"
                        value={this.state.youtube}
                        prefix={
                            <Icon
                                type="youtube"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    />

                    <TextInput
                        validateStatus={errors.instagram}
                        help={errors.instagram}
                        placeholder="Instagram URL"
                        onChange={this.handleFormChange}
                        name="instagram"
                        value={this.state.instagram}
                        prefix={
                            <Icon
                                type="instagram"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    />
                </div>
            );
        }
    };

    handleFormChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSelectChange = (value, option) => {
        this.setState({ [option.props.name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        const status_options = [
            {
                label: "* Select Professional Status",
                value: ""
            },
            {
                label: "Junior Developer",
                value: "Junior Developer"
            },
            {
                label: "Senior Developer",
                value: "Senior Developer"
            },
            {
                label: "Manager",
                value: "Manager"
            },
            {
                label: "CEO",
                value: "CEO"
            }
        ];

        return (
            <Layout.Content className="layout-content">
                <Row>
                    <Col
                        xs={24}
                        sm={24}
                        md={{ span: 14, offset: 6 }}
                        lg={{ span: 14, offset: 6 }}
                        xl={{ span: 14, offset: 6 }}
                    >
                        <h1 className="center-text">Edit Profile</h1>
                        <small>* required fiedls</small>

                        <Form onSubmit={this.handleSubmit} className="">
                            <TextInput
                                validateStatus={errors.handle}
                                help={errors.handle}
                                extra="A unique handle for your profile"
                                placeholder="* Profile Handle"
                                onChange={this.handleFormChange}
                                name="handle"
                                value={this.state.handle}
                            />

                            <SelectOption
                                validateStatus={errors.status}
                                help={errors.status}
                                value={this.state.status}
                                name="status"
                                onSelect={this.handleSelectChange}
                                options={status_options}
                                extra="Job Title"
                            />

                            <TextInput
                                validateStatus={errors.company}
                                help={errors.company}
                                placeholder="Company"
                                onChange={this.handleFormChange}
                                name="company"
                                value={this.state.company}
                            />

                            <TextInput
                                validateStatus={errors.website}
                                help={errors.webiste}
                                placeholder="Website"
                                onChange={this.handleFormChange}
                                name="website"
                                value={this.state.website}
                            />

                            <TextInput
                                validateStatus={errors.location}
                                help={errors.location}
                                placeholder="Location"
                                onChange={this.handleFormChange}
                                name="location"
                                value={this.state.location}
                            />

                            <TextInput
                                validateStatus={errors.skills}
                                help={errors.skills}
                                extra="Please use comma separated values (html,css,javascript)"
                                placeholder="Skills"
                                onChange={this.handleFormChange}
                                name="skills"
                                value={this.state.skills}
                            />

                            <TextInput
                                validateStatus={errors.githubusername}
                                help={errors.githubusername}
                                extra="If you want to include your github repository"
                                placeholder="Github username"
                                onChange={this.handleFormChange}
                                name="githubusername"
                                value={this.state.githubusername}
                            />

                            <Textarea
                                validateStatus={errors.bio}
                                help={errors.bio}
                                extra="Tell us about yourself"
                                placeholder="Short Bio"
                                onChange={this.handleFormChange}
                                name="bio"
                                value={this.state.bio}
                            />

                            <Button
                                onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }));
                                }}
                            >
                                Add Social Network Link
                            </Button>

                            {this.socialInputs()}
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
            </Layout.Content>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    profile: state.profile
});

EditProfile.propTypes = {
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Spin, Row, Col, Button, Layout } from "antd";

import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick = () => {
        this.props.deleteAccount();
    };

    renderContent = () => {
        const { user } = this.props.auth;
        const { loading, profile } = this.props.profile;

        if (loading || profile === null) {
            return <Spin size="large" />;
        } else {
            //check if user has a profile data
            if (Object.keys(profile).length > 0) {
                return (
                    <div>
                        <p>
                            {" "}
                            Welcome{" "}
                            <Link to={`/profile/${profile.handle}`}>
                                {user.name}
                            </Link>
                        </p>
                        <ProfileActions />
                        <div style={{ marginBottom: "20px" }} />

                        <Experience experience={profile.experience} />

                        <div style={{ marginBottom: "10px" }} />

                        <Education education={profile.education} />

                        <Button
                            type="danger"
                            size="large"
                            onClick={this.onDeleteClick}
                        >
                            Delete my account
                        </Button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Row>
                            <Col span={24}>
                                <h1>Welcome {user.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h4>
                                    You have not yet setup your profile, please
                                    add some info
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Link to="/createprofile">
                                    <Button
                                        type="primary"
                                        icon="user"
                                        size="large"
                                    >
                                        Update Profile{" "}
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <Layout.Content className="dashboard-container layout-content">
                <Row>
                    <Col
                        md={{ span: 16, offset: 2 }}
                        lg={{ span: 16, offset: 2 }}
                        xl={{ span: 16, offset: 2 }}
                        xs={24}
                        sm={24}
                    >
                        <h1>Dashboard</h1>
                        {this.renderContent()}
                    </Col>
                </Row>
            </Layout.Content>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin, Col, Row } from "antd";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    onRenderProfiles = () => {
        const { profiles, loading } = this.props.profile;

        if (profiles === null || loading) {
            return <Spin />;
        } else {
            if (profiles.length > 0) {
                return <ProfileItem profiles={profiles} />;
            } else {
                return <h4> No profiles</h4>;
            }
        }
    };

    render() {
        return (
            <Row justify="center">
                <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16, offset: 4 }}
                    lg={{ span: 16, offset: 4 }}
                    xl={{ span: 16, offset: 4 }}
                >
                    <h1>Developer Profiles</h1>
                    <p> Browse and connect with developers</p>
                    {this.onRenderProfiles()}
                </Col>
            </Row>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { List, Avatar, Icon, Button, Row, Col } from "antd";
import isEmpty from "lodash.isempty";

class ProfileItem extends Component {
    renderDescription = profile => {
        const skillsCSV = profile.skills.join(",");
        return (
            <Row>
                <Col sm={{ span: "24" }} md={{ span: "18" }}>
                    <Icon type="laptop" /> {profile.status}{" "}
                    {isEmpty(profile.company) ? null : (
                        <span>at {profile.company}</span>
                    )}
                    <br />
                    <Icon type="star" /> {skillsCSV}
                    <br />
                    <Icon type="environment" /> {profile.location}
                    <br />
                    <br />
                    <Button type="primary">View Profile</Button>
                </Col>
            </Row>
        );
    };

    render() {
        return (
            <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3
                }}
                dataSource={this.props.profiles}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={item.user.avatar}
                                    shape="square"
                                    size="large"
                                />
                            }
                            title={
                                <Link to={`${item.handle}`}>
                                    <span style={{ fontSize: "20px" }}>
                                        {item.user.name}
                                    </span>
                                </Link>
                            }
                            description={this.renderDescription(item)}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

ProfileItem.propTypes = {
    profiles: PropTypes.object.isRequired
};
export default ProfileItem;

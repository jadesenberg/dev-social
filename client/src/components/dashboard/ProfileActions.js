import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "antd";

const ProfileActions = () => {
    return (
        <Button.Group className="profile-action-button-container">
            <Button>
                <Link to="/editprofile">
                    <Icon type="user" style={{ color: "#1890FC" }} />Edit
                    Profile
                </Link>
            </Button>

            <Button>
                <Link to="/addexperience">
                    <Icon type="star-o" style={{ color: "#1890FC" }} />Add
                    Experience
                </Link>
            </Button>

            <Button>
                <Link to="/addeducation">
                    <Icon type="solution" style={{ color: "#1890FC" }} />Add
                    Education
                </Link>
            </Button>
        </Button.Group>
    );
};

export default ProfileActions;

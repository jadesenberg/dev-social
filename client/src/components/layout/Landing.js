import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../css/Landing.css";

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="landing-container">
                <div className="landing-content">
                    <h1 className="landing-title">dev&lt;s&gt;ocial</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Landing);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Table, Button } from "antd";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
    onDelete = expid => e => {
        this.props.deleteExperience(expid);
    };

    render() {
        const columns = [
            {
                title: "Company",
                dataIndex: "company",
                key: "company"
            },
            {
                title: "Title",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "Years",
                key: "years",
                render: (text, record) => (
                    <span>
                        <Moment format="YYYY-MM-DD">{record.from}</Moment> -{" "}
                        {record.to === null ? (
                            "Now"
                        ) : (
                            <Moment format="YYYY-MM-DD">{record.to}</Moment>
                        )}
                    </span>
                )
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                    <Button type="danger" onClick={this.onDelete(record._id)}>
                        Delete
                    </Button>
                )
            }
        ];

        return (
            <div>
                <h3>Experience Credentials</h3>

                <Table
                    rowKey="_id"
                    size="small"
                    columns={columns}
                    dataSource={this.props.experience}
                    bordered
                />
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(withRouter(Experience));

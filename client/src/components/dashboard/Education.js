import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Table, Button } from "antd";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
    onDelete = eduid => e => {
        this.props.deleteEducation(eduid);
    };

    render() {
        const columns = [
            {
                title: "School",
                dataIndex: "school",
                key: "school"
            },
            {
                title: "Degree",
                dataIndex: "degree",
                key: "degree"
            },
            {
                title: "Field of study",
                dataIndex: "fieldofstudy",
                key: "fieldofstudy"
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
                <h3>Education Credentials</h3>

                <Table
                    rowKey="_id"
                    size="small"
                    columns={columns}
                    dataSource={this.props.education}
                    bordered
                />
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
    education: PropTypes.array.isRequired
};

export default connect(null, { deleteEducation })(withRouter(Education));

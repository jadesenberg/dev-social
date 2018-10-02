import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const { TextArea } = Input;

const Textarea = ({
    name,
    placeholder,
    value,
    onChange,
    validateStatus,
    help,
    extra,
    type
}) => {
    return (
        <FormItem
            validateStatus={validateStatus ? "error" : ""}
            help={help}
            extra={extra}
            hasFeedback
        >
            <TextArea
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                type={type}
            />
        </FormItem>
    );
};

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    validateStatus: PropTypes.string,
    help: PropTypes.string,
    extra: PropTypes.string,
    type: PropTypes.string
};

export default Textarea;

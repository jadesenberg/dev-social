import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

const TextInput = ({
    name,
    placeholder,
    value,
    onChange,
    validateStatus,
    help,
    extra,
    type,
    prefix
}) => {
    return (
        <FormItem
            validateStatus={validateStatus ? "error" : ""}
            help={help}
            extra={extra}
            hasFeedback
        >
            <Input
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                type={type}
                prefix={prefix}
            />
        </FormItem>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    validateStatus: PropTypes.string,
    help: PropTypes.string,
    extra: PropTypes.string,
    type: PropTypes.string
};

export default TextInput;

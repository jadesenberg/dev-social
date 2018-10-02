import React from "react";
import { Form, Select } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

const TextInput = ({
    name,
    placeholder,
    value,
    onSelect,
    validateStatus,
    help,
    extra,
    type,
    options
}) => {
    const optionList = options.map(option => (
        <Select.Option value={option.value} key={option.value} name={name}>
            {option.label}
        </Select.Option>
    ));

    return (
        <FormItem
            validateStatus={validateStatus ? "error" : ""}
            help={help}
            extra={extra}
            hasFeedback
        >
            <Select
                defaultValue={value}
                value={value}
                onSelect={onSelect}
                name={name}
            >
                {optionList}
            </Select>
        </FormItem>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
    validateStatus: PropTypes.string,
    help: PropTypes.string,
    extra: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.array.isRequired
};

export default TextInput;

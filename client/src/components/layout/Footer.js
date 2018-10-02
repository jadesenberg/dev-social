import React from "react";
import { Layout } from "antd";

export default () => {
    return (
        <Layout.Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Layout.Footer>
    );
};

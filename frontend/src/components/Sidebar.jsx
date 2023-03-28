import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <Menu
            style={{
                width: 256,
            }}
            defaultSelectedKeys={["teachers"]}
            defaultOpenKeys={["teachers"]}
            mode="inline"
            onClick={() => {
                navigate("/");
            }}
            items={[
                {
                    key: "accounts",
                    label: "Accounts",
                    icon: <UserOutlined />,
                },
            ]}
        />
    );
};
export default Sidebar;

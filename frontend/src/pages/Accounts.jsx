import React, { useState } from "react";
import { Button, message, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const accounts = [
    {
        id: "1",
        name: "John Brown",
    },
    {
        id: "2",
        name: "Alex Smith",
    },
    {
        id: "3",
        name: "James Bond",
    },
];

const Accounts = () => {
    const [data, setData] = useState(accounts);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const removeAccount = (id) => {
        setData((prev) => prev.filter((t) => t.id !== id));
    };

    const setUser = (name) => {
        setData((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: name,
            },
        ]);
    };

    return (
        <div className="mt-10">
            <Button type="primary" onClick={() => setShowCreateModal(true)}>
                Create User
            </Button>
            <div className="my-5"></div>
            <AccountsTable data={data} removeAccount={removeAccount} />
            <CreateAccountModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                setUser={setUser}
            />
        </div>
    );
};

export default Accounts;

const AccountsTable = ({ data, removeAccount }) => {
    const { confirm } = Modal;

    const showDeleteConfirm = (id) => {
        confirm({
            title: "Are you sure delete this teacher?",
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                removeAccount(id);
            },
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "80%",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/${record.id}`} state={record}>
                        View
                    </Link>
                    <a
                        className="text-red-500"
                        onClick={() => {
                            showDeleteConfirm(record.id);
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};

const CreateAccountModal = ({
    showCreateModal,
    setShowCreateModal,
    setUser,
}) => {
    const [name, setName] = useState("");

    const createAccount = () => {
        if (!name) {
            return message.warning("Name field is required");
        }
        setUser(name);
        message.success("Account added successfully.");
        setShowCreateModal(false);
        setName("");
    };

    return (
        <>
            <Modal
                open={showCreateModal}
                onOk={createAccount}
                okText="Create"
                onCancel={() => setShowCreateModal(false)}
            >
                <div className="p-5">
                    <h1 className="text-[24px] pb-2">Create Account</h1>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3 text-[18px] text-black font-normal placeholder:text-[14px] border outline-none focus:ring-1 focus:ring-blue-400 w-full py-4 rounded-lg px-2"
                        placeholder="Enter the name"
                    />
                </div>
            </Modal>
        </>
    );
};

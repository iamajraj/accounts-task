import React, { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axiosInstance from "../service/axiosInstance";

const Accounts = () => {
    const [data, setData] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const removeAccount = async (id) => {
        try {
            await axiosInstance.delete(`/accounts/${id}`);
            await getAccounts();
        } catch (err) {
            message.error(
                err?.response?.data?.message ?? "Something went wrong"
            );
        }
    };

    const getAccounts = async () => {
        try {
            const res = await axiosInstance.get("/accounts");
            const { accounts } = res.data;
            setData(accounts);
        } catch (err) {}
    };

    useEffect(() => {
        getAccounts();
    }, []);

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
                fetchAccounts={getAccounts}
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
                    <Link to={`/${record._id}`}>View</Link>
                    <a
                        className="text-red-500"
                        onClick={() => {
                            showDeleteConfirm(record._id);
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
    fetchAccounts,
}) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const createAccount = async () => {
        if (loading) return;

        if (!name) {
            return message.warning("Name field is required");
        }

        setLoading(true);

        try {
            await axiosInstance.post("/accounts", {
                name,
            });
            await fetchAccounts();
            message.success("Account added successfully.");
            setShowCreateModal(false);
            setName("");
        } catch (err) {
            message.error(err.response?.data.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
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

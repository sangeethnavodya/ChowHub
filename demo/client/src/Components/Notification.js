import React, { useEffect, useState } from "react";
import { List, Avatar, Spin, Button } from "antd";
import axios from "axios";

function Notification(props) {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/notifications/${localStorage.getItem("userId")}`)
            .then((res) => {
                setLoading(false);
                setNotifications(res.data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [props.visible,seen]);

    function handleMarkAsRead(id) {
        console.log(id);
        axios
            .put(`http://localhost:8080/notifications/${id}`)
            .then((res) => {
                const updatedNotifications = notifications.map((n) => {
                    if (n._id === id) {
                        return {
                            ...n,
                            seen: true,
                        };
                    }
                    return n;
                });
                setNotifications(updatedNotifications);
                setSeen(!seen);
            })
            .catch((err) => console.log(err));
    }

    if (loading) {
        return <Spin />;
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
                <List.Item style={{ backgroundColor: item.seen ? "#f0f0f0" : "white" }}>
                    <List.Item.Meta
                        description={item.message}
                    />
                    {!item.seen && (
                        <Button type="ghost" onClick={() => handleMarkAsRead(item.id)}>
                            Mark as Read
                        </Button>
                    )}
                </List.Item>
            )}
        />
    );
}

export default Notification;

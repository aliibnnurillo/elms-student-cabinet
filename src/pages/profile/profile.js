import React, { useState } from "react";
import { ProfileHeader } from "../../component/header";
import { Row, Col, List, Avatar, Modal, Button } from "antd";
import { EditOutlined, CameraFilled } from "@ant-design/icons";
import "./profile.css";

const data = [
  {
    title: "Passport raqami",
    description: "AA5237421",
  },
  {
    title: "Telefon raqami",
    description: "+998 99 042 51 84",
    icon: <EditOutlined />,
  },
  {
    title: "F.I.O",
    description: "Berdiyev Jamshidbek Dilshod o’g’li",
  },
  {
    title: "Email",
    description: "berdiyev.j.1999@gmail.com",
    icon: <EditOutlined />,
  },
];

const ProfilePage = () => {
  const [visible, setVisible] = useState(false);
  const setModalVisible = (visible) => {
    setVisible(visible);
  };
  const modal_list = (icons) => {
    return (
      <>
        <span className="for-icon" onClick={() => setModalVisible(true)}>
          {icons}
        </span>
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={visible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </>
    );
  };
  return (
    <>
      <ProfileHeader />
      <div className="content profile_page">
        <Row className="profil_row" gutter={[24, 40]}>
          <Col span={16} className="forAvatars">
            <span>
              <Avatar
                className="img-avatars user-icon"
                size={100}
                src="/assets/userimg.jpg"
              />
              <span className="for-avatar-icon">
                <CameraFilled />
              </span>
            </span>
          </Col>
          <Col span={16}>
            <Row gutter={[30, 15]}>
              {data.map((item) => (
                <Col span={12}>
                  <List itemLayout="horizontal" className="lists">
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        description={
                          <p>
                            <span>{item.description}</span>
                            {item.icon ? modal_list(item.icon) : null}
                          </p>
                        }
                      />
                    </List.Item>
                  </List>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;

import React from "react";
import { Popover, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
const Pop = ({ icons }) => {
  return (
    <Popover
      placement="bottomRight"
      title="Bildirishnoma"
      content={
        <div>
          <Card className="for-card-message">
            <Meta
              avatar={<Avatar size={32} src="/assets/ico.png" />}
              title={
                <Link to="">
                  Texnik nosozliklar sababli, sistema soat 14:00 dan 16:00 gacha
                  o’chadi
                </Link>
              }
              description={<span>Bugun, 16:12</span>}
            />
          </Card>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta
              title={
                <Link to="">Dasturlash muhiti(IDE) tushunchasi haqida</Link>
              }
              description={<span>13 iyun 2020, 19:15</span>}
            />
          </Card>
        </div>
      }
      trigger="click"
      overlayClassName="popover-class"
    >
      <Link to="" className="head-example">
        {icons}
      </Link>
    </Popover>
  );
};

export default Pop;

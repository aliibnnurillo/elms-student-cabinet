import React from "react";
import { Table, Divider, Avatar } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import get from "lodash/get";
class MessageTable extends React.Component {
  state = {
    selectedRowKeys: [],
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const {
      data,
      newCol,
      remove = () => null,
      type = "",
      specColumns,
    } = this.props;
    console.log("data", data);
    const columns = [
      {
        className: "star-col",
        width: 20,
        key: "star",
        render: () => <StarOutlined />,
      },
      {
        className: "avatar-col",
        key: "avatar",
        dataIndex: "receiver_username",
        width: 60,
        render: (cell) => {
          const nameFirstSign = cell.slice(0, 1).toUpperCase();
          return <Avatar size={40}>{nameFirstSign}</Avatar>;
        },
      },
      {
        key: "msg",
        className: "message-col",
        render: (cell) => {
          return (
            <div className="message-wrapper">
              <div className="message-titles">
                <div>
                  <strong style={{ fontSize: 16 }}>
                    {get(cell, "receiver_username") || null}
                  </strong>
                  <Divider style={{ height: 16 }} type="vertical" />
                  <span style={{ fontSize: 16 }}>
                    {get(cell, "title") || null}
                  </span>
                </div>
                {!newCol ? (
                  <div style={{ color: "#999" }}>
                    <CalendarOutlined /> &nbsp; {get(cell, "created_at")}
                  </div>
                ) : null}
              </div>
              <p style={{ color: "#8d8d8d" }}>{get(cell, "message") || null}</p>
            </div>
          );
        },
      },
      {
        className: "action-col",
        render: (cell, record) => {
          return (
            <DeleteOutlined onClick={() => remove({ type, id: record.id })} />
          );
        },
      },
    ];

    if (type === "trash") {
      columns.pop();
    }

    if (newCol) {
      columns.splice(columns.length - 1, 1, newCol);
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={!specColumns ? columns : specColumns}
        dataSource={data}
      />
    );
  }
}

export default MessageTable;

import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Form, Input, Modal, Button, Table, Space, Spin } from "antd";
import FetchSelect2 from "component/FetchSelect/FetchSelect2";
import { useTranslation, withTranslation } from "react-i18next";
import get from "lodash/get";
import { CURRENT_LANG } from "../../constants";
import "./message.scss";

const Compose = inject("message")(
  observer(({ message: { create, isSubmitting }, formValues }) => {
    const [form] = Form.useForm();
    const [t] = useTranslation();
    const [group, setGroup] = useState("student");
    const [visible, setVisible] = useState(false);
    const [removedReceivers, setRemovedReceivers] = useState([]);

    useEffect(() => {
      if (formValues) {
        form.setFieldsValue({
          title: formValues.title,
          message: formValues.message,
        });
      }
    }, [formValues]);

    const formFinish = (values) => {
      create({
        credentials: {
          ...values,
          status: 1,
          template_message: 0,
        },
        url: "/messages/send",
      });
    };

    const onReset = () => {
      form.resetFields();
      setRemovedReceivers([]);
    };

    const sendToDraft = () => {
      form.validateFields().then((values) => {
        create({
          credentials: { ...values, status: 0, template_message: false },
          url: "/messages/send",
        });
      });
    };

    const sendToTemplate = () => {
      form.validateFields().then((values) => {
        create({
          credentials: {
            ...values,
            template_message: true,
            status: 0,
          },
          url: "/messages/send",
        });
      });
    };

    // const onChange = (val) => {
    //   const _formReceivers = form.getFieldsValue().receiver_id || [];
    //   if (val.length === 0) {
    //     const jonatiladiganReceiverlar = _formReceivers.filter(
    //       (item) => !removedReceivers.includes(item)
    //     );
    //     console.log(jonatiladiganReceiverlar);
    //     form.setFieldsValue({
    //       receiver_id: jonatiladiganReceiverlar,
    //     });
    //   } else {
    //     setRemovedReceivers(val);
    //     form.setFieldsValue({ receiver_id: [..._formReceivers, ...val] });
    //   }
    // };

    return (
      <Spin spinning={isSubmitting}>
        <div className="compose-message">
          <h2 style={{ textAlign: "center", margin: "12px 0" }}>
            {t("Compose a message")}
          </h2>
          <Form
            form={form}
            onFinish={formFinish}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="receiver_id"
              label={t("Receivers")}
              rules={[
                {
                  required: true,
                  message: t("Please select receivers!"),
                },
              ]}
            >
              <div
                style={{
                  marginBottom: 12,
                }}
              >
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setVisible(true);
                      setGroup("student");
                    }}
                  >
                    {t("Select student")}
                  </Button>
                </Space>
              </div>
            </Form.Item>
            <Form.Item
              name="title"
              label={t("Title")}
              rules={[
                {
                  required: true,
                  message: t("Please input the title of message!"),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label={t("Message")}
              rules={[
                {
                  required: true,
                  message: t("Please input the message!"),
                },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Space size="middle">
                  <Button onClick={sendToTemplate} disabled={isSubmitting}>
                    {t("Save As Template")}
                  </Button>
                  <Button onClick={sendToDraft} disabled={isSubmitting}>
                    {t("Send To Draft")}
                  </Button>
                </Space>
              </div>
              <div>
                <Space size="middle">
                  <Button danger onClick={onReset} disabled={isSubmitting}>
                    {t("Reset")}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    {t("Submit")}
                  </Button>
                </Space>
              </div>
            </div>
          </Form>
          <CollectionCreateForm
            group={group}
            visible={visible}
            onCancel={() => setVisible(false)}
            setGroup={setGroup}
            form={form}
          />
        </div>
      </Spin>
    );
  })
);

const CollectionCreateForm = inject("student")(
  observer((props) => {
    const [t] = useTranslation();
    const { visible, onCancel, group, form } = props;
    const { fetchListData, getFilteredListData } = props.student;
    const { filteredListData, isLoading } = props[group];
    const [prevReceivers, setPrevReceivers] = useState([]);

    useEffect(() => {
      fetchListData({
        university_id: get(props, "authStore.profile.university_id") || 1,
        type: "student",
        language: CURRENT_LANG,
      });
      setPrevReceivers(form.getFieldsValue().receiver_id || []);
    }, [group]);

    return (
      <Modal
        visible={visible}
        title={
          group === "student"
            ? t("Select student receivers")
            : t("Select tutor receivers")
        }
        okText="Select"
        className="receivers-modal"
        cancelText="Cancel"
        onCancel={() => {
          onCancel();
        }}
        onOk={() => {
          const _receivers = [...form.getFieldsValue().receiver_id];
          const _final = _receivers.filter(
            (item) => !prevReceivers.includes(item)
          );
          form.setFieldsValue({
            receiver_id: [...prevReceivers, ..._final],
          });
          onCancel();
        }}
      >
        <div>
          <h4>
            {group === "student" ? "Student Groups" : "Tutor Departments"}
          </h4>
          <FetchSelect2
            url={`/rating/get-groups-list?language=${CURRENT_LANG}`}
            style={{ width: "100%" }}
            valueProp="group_name"
            outputProp="group_name"
            onChange={(groupName) => getFilteredListData(groupName)}
            allowClear
          />
          <ReceiverTable
            data={filteredListData}
            loading={isLoading}
            form={form}
          />
        </div>
      </Modal>
    );
  })
);

export default Compose;

@withTranslation()
class ReceiverTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    this.props.form.setFieldsValue({
      receiver_id: selectedRowKeys,
    });

    this.setState({ selectedRowKeys });
  };

  render() {
    const { t } = this.props;
    const { selectedRowKeys } = this.state;
    const { data, loading, title } = this.props;
    const columns = [
      {
        title: t("Full Name"),
        dataIndex: "fio",
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Table
        title={title}
        rowKey="id"
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  }
}

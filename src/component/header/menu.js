import React, {useState, useEffect} from "react";
import {Menu, Avatar, Button} from "antd";
import {
    HomeOutlined,
    BankOutlined,
    FormOutlined,
    ProfileOutlined,
    ReadOutlined,
    MenuOutlined,
    // MessageOutlined
} from "@ant-design/icons";
import "./menu.css";
import {NavLink, Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {observer, inject} from "mobx-react";
import get from "lodash/get";
import config from "config";

const keys = [
    "home",
    "subjects",
    "curriculum",
    "posts",
    "rating",
    "exam",
    "controls",
];

const LeftMenu = ({authStore}) => {
    const [selectedKey, setSelectedKey] = useState(["home"]);
    const [visiable, setVisiable] = useState(false);
    const {pathname} = useLocation();
    useEffect(() => {
        console.log(setSelectedKey(["home"]));
        let f;
        if (
            pathname.split("/").some((item) => {
                f = keys.findIndex((i) => i === item);
                return f !== -1;
            })
        ) {
            setSelectedKey([keys[f]]);
        } else {
            setSelectedKey([keys[0]]);
        }
    }, [pathname]);

    const handleSelect = ({key}) => {
        setSelectedKey(key);
    };

    const handleClick = (e) => {
        setVisiable(!visiable);
    };

    const [t] = useTranslation();

    return (
        <div className="menu-container">
            <div>

      <span className="menu-top">
        <Link to="/">
          <Avatar size={64} src="/assets/logo.png" className="avatars"/>
        </Link>
        <Button className="btn Menu_Button" onClick={handleClick}>
          <MenuOutlined/>
        </Button>
      </span>
                <Menu
                    className={`left-menu ${visiable ? "" : "menu_show"}`}
                    selectedKeys={selectedKey}
                    mode="inline"
                    onSelect={handleSelect}
                >
                    <Menu.Item key="home">
                        <NavLink to="/" onClick={handleClick}>
                            <HomeOutlined/>
                            <span>{t("Bosh sahifa")}</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="curriculum">
                        <NavLink to="/curriculum" onClick={handleClick}>
                            <BankOutlined/>
                            <span>{t("O'quv rejasi")}</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="subjects">
                        <NavLink
                            to={`/${get(authStore, "activeSemesterId")}/subjects`}
                            onClick={handleClick}
                        >
                            <ReadOutlined/>
                            <span>{t("Fanlar")}</span>
                        </NavLink>
                    </Menu.Item>
                    {/*<Menu.Item key="messages">*/}
                    {/*  <NavLink to="/messages" onClick={handleClick}>*/}
                    {/*    <MessageOutlined />*/}
                    {/*    <span>{t("Xabarlar")}</span>*/}
                    {/*  </NavLink>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="posts">
                        <NavLink to="/posts" onClick={handleClick}>
                            <ProfileOutlined/>
                            <span>{t("Yangiliklar va e'lonlar")}</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="controls" onClick={handleClick}>
                        <NavLink to="/controls">
                            <FormOutlined/>
                            <span>{t("Nazoratlar")}</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </div>
            <div className={'appVersion'}>v{config.app.version}dev</div>
        </div>
    );
};

export default inject("authStore")(observer(LeftMenu));

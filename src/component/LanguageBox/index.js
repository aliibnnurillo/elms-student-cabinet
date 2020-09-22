import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import "./LanguageBox.css";
import moment from "moment";
import { getUser } from "../../common/utils/utils";
import { inject, observer } from "mobx-react";

const LanguageBox = (props) => {
  const {
    authStore: { changeLang },
  } = props;
  const [t, i18n] = useTranslation();
  const [activeLangKey, setActiveKeyLang] = useState(i18n.language);
  const languages = [
    {
      key: "oz",
      img: "oz.png",
      name: "O'zbek",
    },
    {
      key: "uz",
      img: "oz.png",
      name: "Ўзбек",
    },
    {
      key: "ru",
      img: "ru.png",
      name: "Русский",
    },
    {
      key: "en",
      img: "en.png",
      name: "English",
    },
  ];
  const _user = getUser();

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (_user && _user.default_language) {
      const activeLang = _user.default_language;
      setActiveKeyLang(activeLang);
      i18n.changeLanguage(activeLang);
      moment.locale(
        activeLang === "uz"
          ? "uz"
          : activeLang === "oz"
          ? "uz-latn"
          : activeLang
      );
    }
  }, []);

  const handleMenuItemClick = ({ key }) => {
    changeLang(key)
      .then((res) => {
        if (res.status === 200) {
          setActiveKeyLang(key);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menu = (
    <Menu className="lang-box-menu" onClick={handleMenuItemClick}>
      {languages
        .filter((item) => item.key !== activeLangKey)
        .map((item) => (
          <Menu.Item key={item.key}>
            <a href="#">
              <img src={`/assets/${item.img}`} alt={item.name} />
              <span>{item.name}</span>
            </a>
          </Menu.Item>
        ))}
    </Menu>
  );

  const renderActiveLang = () => {
    const activeLang = languages.find((item) => item.key === activeLangKey);
    return (
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        href="#"
      >
        <img
          style={{ width: 22, height: 22 }}
          src={`/assets/${activeLang.img}`}
          alt={activeLang.name}
        />
      </a>
    );
  };
  return (
    <Dropdown className="lang-box" overlay={menu} trigger={["click"]}>
      {renderActiveLang()}
    </Dropdown>
  );
};

export default inject("authStore")(observer(LanguageBox));

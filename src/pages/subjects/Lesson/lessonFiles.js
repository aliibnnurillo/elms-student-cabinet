import React from "react";
import {
  FileZipOutlined,
  FilePdfOutlined,
  PictureOutlined,
  FileWordOutlined,
  FileUnknownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatBytes } from "../../../common/services/common";
export default function LessonFiles({ resourceFiles }) {
  const [t] = useTranslation();

  return Array.isArray(resourceFiles) && resourceFiles.length ? (
    <div>
      <h2>{t("Darsga doir resurslar")}</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {resourceFiles.map((resource) => {
          let IconType = "";
          const _item = resource.media[0];
          switch (_item.extension) {
            case "zip":
              IconType = FileZipOutlined;
              break;
            case "png":
            case "jpg":
            case "jpeg":
              IconType = PictureOutlined;
              break;
            case "pdf":
              IconType = FilePdfOutlined;
              break;
            case "doc":
            case "docx":
              IconType = FileWordOutlined;
              break;
            default:
              IconType = FileUnknownOutlined;
              break;
          }
          return (
            <div
              key={resource.id}
              style={{
                backgroundColor: "#F3F4FF",
                display: "flex",
                borderRadius: 12,
                alignItems: "center",
                padding: 12,
                justifyContent: "space-between",
                margin: 6,
              }}
            >
              <div>
                <span
                  className="icon-wrapper bg-white"
                  style={{ marginRight: 12 }}
                >
                  <IconType />
                </span>
                <Link
                  to={resource.file_url_resource}
                  target="_blank"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(resource.file_url_resource);
                  }}
                >
                  {resource.fileName ? resource.fileName : t("Fayl")}
                </Link>
              </div>
              <span>{formatBytes(_item.size, 0)}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}

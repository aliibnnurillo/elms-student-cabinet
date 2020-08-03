import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import "./news.css";
import { NewsHeader } from "../../component/header";
const OneNews = () => {
  const news = [
    {
      id: "1",
      imgUrl: "/assets/photo1.png",
      title: "Kompyuter viruslari haqida va ularning turlari",
      date: "14 iyun 2020, 14:33",
      description: `Hozirgi kunda hamma kompyuter va telefon foydalanuvchilari virus degan tushunchani yaxshi bilishadi.
       Bu kichik dastur bilan bir necha bor uchrashishgan. Ko'p hollarda mag'lub ham bo'lishgan. Bilib olgan bo'lsangiz 
       bu maqolamiz viruslarga bag'ishlanadi.Virus – bu dasturchi tomonidan tuzilgan, kompyuter ish faoliyatini tekis ishlashiga halaqit beradigan,
       oqibatda kompyuterni yoqilishini ham taqiqlab qo'yadigan dasturdir. Bu dasturlar asosan internet tarmog'i orqali foydalanuvchi kompyuteriga tushadi.
      Albatta, bu dastur, internet foydalanuvchisi bilmagan holda o'z kompyuterida paydo bo'ladi. Ularga qarshi kurashadigan dastur antivirus deyiladi(bu 
      to'g'risida ushbu maqolada o'qishingiz mumkin). Viruslar kompyuterlarda o'zini har xil tutadi. Ba'zi birlari kompyuteringizni kerakmas fayllar bilan to'latsa, 
      yana ba'zilari operativ xotirani ko'p qismini ishlatib, kompyuteringizni qotirib qo'yadi, viruslarning bir qismi esa, kerakli fayllaringizni yoki tizim fayllarini 
      o'chirib sizga zarar yetkazadi. Shulardan saqlanish uchun viruslarning turini bilib olish lozim, ya'ni qaysi virus nima ish qiladi va bundan saqlanish o'z o'zidan
       kelib chiqadi. Quyida ularning turlari keltirilgan(turlari ref.uz dan olindi):
      Troyanlar (Trojan Horses) – Qadimgi yunonlarning Troyaga yurishlari davrida qo'llagan hiylasi, ya'ni 
      troyaliklarni otga ishqiboz ekanligidan foydalanib, ularga katta yog'och ot sovg'a qilishlari va bu otning troyaliklar mag'lubiyatiga olib kelishi voqeasidan 
      olingan nom.       Hozirda troya oti iborasi "hosiyatsiz sovg'a" degan ma'noni bildiradi. Kompyuter va internet dunyosida troyanlar "hosiyatsiz dastur" deb
       nomlanishi maqsadga muvofiq. Troyanlar odatda internet orqali tarqaladi. Troyanlar kompyuteringizga o'rnashib olib,
       dastlab foydali dastur sifatida o'zlarini tanishtiradilar, lekin ularning asl vazifasi foydalanuvchiga noma'lumligicha qoladi. Yashirin ravishda ular 
       o'zlarining yaratuvchisi (cracker – yovuz haker) tomonidan belgilangan harakatlarni amalga oshiradilar. Troyanlar o'z-o'zidan ko'paymaydi, lekin kompyuteringiz 
       xavfsizligini ishdan chiqaradi: troyanlar kerakli ma'lumotlaringizni o'chirib yuborishi, kompyuterdagi ma'lumotlarni kerakli manzilga jo'natishi, kompyuteringizga 
       internetdan ruxsatsiz ulanishlarni amalga oshirishi mumkin.
      Chuvalchang viruslar (Worms) – Chuvalchang viruslar o'z nomiga mos ravishda juda tez o'z-o'zidan ko'payadigan viruslardir. Odatda bu viruslar internet yo'li
       intranet tarmoqlari orasida tarqaladi. Tarqalish usuli sifatida elektron xatlar yoki boshqa tez tarqaluvchi mexanizmlardan foydalanadi. Ular haqiqatan ham
        kompyuteringizdagi ma'lumotlar va kompyuter xavfsizligiga katta ziyon yetkazadi. Chuvalchang viruslar operatsion tizimning nozik joylaridan foydalanish yoki
         zararlangan elektron xatlarni ochish yo'li bilan kompyuteringizga o'rnashib olishi mumkin.`,
      link: "/news/one-news",
    },
  ];
  return (
    <>
      <NewsHeader />
      <div className="news-container content">
        <Row>
          {news.map((item) => (
            <Col key={item.id} span={14} offset={5}>
              <div className="for-img">
                <img src={`${item.imgUrl}`} alt={item.title} />
              </div>
              <h1>{item.title}</h1>
              <p className="for-data-tag">
                <span className="time">{item.date}</span>
                <Tag icon={<EyeFilled />}>15</Tag>
              </p>
              <p className="description">{item.description}</p>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default OneNews;

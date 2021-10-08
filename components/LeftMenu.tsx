import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextsmsIcon from '@mui/icons-material/Textsms';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import List from "./List";
import LeftMenuItem from "./LeftMenuItem";
const menuItems = [
    {text: "Популярное", icon: <WhatshotIcon />, path: "/"},
    {text: "Свежее", icon: <AccessTimeIcon />, path: "/new"},
    {text: "Сообщения", icon: <TextsmsIcon />, path: "/m"},
    {text: "Рейтинг", icon: <TrendingUpIcon />, path: "/rating"},
    {text: "Подписки", icon: <FormatListBulletedIcon />, path: "/subs"},
]

const LeftMenu = () => {
    return (
        <List items={menuItems} renderItem={item => (
            <LeftMenuItem
                key={item.text}
                text={item.text}
                path={item.path}
                icon={item.icon}
            />
        )}/>
    );
};

export default LeftMenu;
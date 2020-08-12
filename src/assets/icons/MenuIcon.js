import React from "react";
import { Icon } from "antd";

const menu_svg = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 14">
        <path
            fill="#AFBACC"
            fillRule="nonzero"
            d="M20 7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1zM1 2h18c.6 0 1-.4 1-1s-.4-1-1-1H1C.4 0 0 .4 0 1s.4 1 1 1zm18 10H1c-.6 0-1 .4-1 1s.4 1 1 1h18c.6 0 1-.4 1-1s-.4-1-1-1z"
        />
    </svg>
);
export const MenuIcon = (props) => <Icon component={menu_svg} {...props} />;
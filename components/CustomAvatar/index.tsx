import { FC } from "react";
import { Avatar } from "@mui/material";
import CustomBadge from "../CustomBadge";

interface CustomAvatarProps {
    avatar: string,
    isOnline: boolean,
}
const CustomAvatar: FC<CustomAvatarProps> = ({avatar, isOnline}) => {
    return (
        <CustomBadge
            isOnline={isOnline}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Avatar src={avatar}/>
        </CustomBadge>
    );
};

export default CustomAvatar;
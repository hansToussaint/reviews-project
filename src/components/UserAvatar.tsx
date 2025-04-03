import { Avatar } from "@mui/material";
import { useState } from "react";
import theme from "../styles/Theme";
import SpinnerMini from "./SpinnerMini";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, size = 40 }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        mr: 1,
        color: theme.palette.common.secondaryText,
        bgcolor: theme.palette.common.backgroundGreen,
        border: `1px solid ${theme.palette.common.secondaryText}`,
        position: "relative",

        "& img": {
          objectFit: "cover",
        },
      }}
    >
      {!src && name ? name[0].toUpperCase() : null}

      {src && (
        <img
          src={src}
          alt={name}
          style={{
            width: size,
            height: size,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            objectFit: "cover",
          }}
          onLoad={() => setLoaded(true)}
        />
      )}

      {/* adding a spinner while loading */}
      {src && !loaded && <SpinnerMini />}
    </Avatar>
  );
};

export default UserAvatar;

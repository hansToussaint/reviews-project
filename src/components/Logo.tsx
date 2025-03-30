import { Link } from "react-router";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="/Reviews.png"
        alt="Logo"
        loading="lazy"
        style={{
          display: "block",
          height: "1.8rem",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Link>
  );
};

export default Logo;

import { Link } from "wouter";

type BottomBarProps = {
  activeElement?: "foto" | "video" | "home";
};

const BottomBar = ({ activeElement }: BottomBarProps) => {
  return (
    <div className="bottom-bar">
      <div
        className={`bottom-bar__item ${
          activeElement === "foto" ? "active" : ""
        }`}
      >
        <Link href="/foto">Photo</Link>
      </div>
      <div
        className={`bottom-bar__item big ${
          activeElement === "home" ? "active" : ""
        }`}
      >
        <Link href="/">E</Link>
      </div>
      <div
        className={`bottom-bar__item ${
          activeElement === "video" ? "active" : ""
        }`}
      >
        <Link href="/video">Video</Link>
      </div>
    </div>
  );
};

export default BottomBar;

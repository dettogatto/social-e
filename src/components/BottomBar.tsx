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
        <a href="/foto">Foto</a>
      </div>
      <div
        className={`bottom-bar__item big ${
          activeElement === "home" ? "active" : ""
        }`}
      >
        <a href="/">E</a>
      </div>
      <div
        className={`bottom-bar__item ${
          activeElement === "video" ? "active" : ""
        }`}
      >
        <a href="/video">Video</a>
      </div>
    </div>
  );
};

export default BottomBar;

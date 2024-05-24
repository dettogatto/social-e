import { ReactNode } from "react";

type LightboxProps = {
  onClose: () => void;
  children?: ReactNode;
};

const Lightbox = ({ onClose, children }: LightboxProps) => {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content">{children}</div>
    </div>
  );
};

export default Lightbox;

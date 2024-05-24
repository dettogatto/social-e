import { ref } from "firebase/storage";
import { storage } from "../helpers/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

type VideoPreviewProps = {
  path: string;
};

const VideoPreview = ({ path }: VideoPreviewProps) => {
  const imgRef = ref(storage, path);
  const [imgUrl] = useDownloadURL(imgRef);
  return (
    <video
      autoPlay={true}
      loop={true}
      muted={true}
      controls={false}
      src={imgUrl}
      style={{ width: "100%", display: "block" }}
    />
  );
};

export default VideoPreview;

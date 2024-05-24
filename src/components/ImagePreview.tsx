import { ref } from "firebase/storage";
import { storage } from "../helpers/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

type ImagePreviewProps = {
  path: string;
};

const ImagePreview = ({ path }: ImagePreviewProps) => {
  const imgRef = ref(storage, path);
  const [imgUrl] = useDownloadURL(imgRef);
  return <img src={imgUrl} style={{ width: "100%", display: "block" }} />;
};

export default ImagePreview;

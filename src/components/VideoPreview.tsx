import { deleteObject, ref } from "firebase/storage";
import { auth, storage } from "../helpers/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { DocumentReference, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type VideoPreviewProps = {
  path: string;
  docRef: DocumentReference;
};

const VideoPreview = ({ path, docRef }: VideoPreviewProps) => {
  const imgRef = ref(storage, path);
  const [imgUrl] = useDownloadURL(imgRef);
  const [user] = useAuthState(auth);

  const handleDelete = async () => {
    if (confirm("Sicura di voler cancellare questo video?") === false) return;
    try {
      await deleteObject(imgRef);
    } catch (error) {
      console.error(error);
    }
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <video
      autoPlay={true}
      loop={true}
      muted={true}
      controls={false}
      src={imgUrl}
      style={{ width: "100%", display: "block" }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (user) {
          handleDelete();
        }
      }}
    />
  );
};

export default VideoPreview;

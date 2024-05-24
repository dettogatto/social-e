import { ref, deleteObject } from "firebase/storage";
import { DocumentReference, deleteDoc } from "firebase/firestore";
import { auth, storage } from "../helpers/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useAuthState } from "react-firebase-hooks/auth";

type ImagePreviewProps = {
  path: string;
  docRef: DocumentReference;
};

const ImagePreview = ({ path, docRef }: ImagePreviewProps) => {
  const imgRef = ref(storage, path);
  const [imgUrl] = useDownloadURL(imgRef);
  const [user] = useAuthState(auth);

  const handleDelete = async () => {
    if (confirm("Sicura di voler cancellare questa immagine?") === false)
      return;
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
    <img
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

export default ImagePreview;

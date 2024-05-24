import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage, db } from "../helpers/firebase";
import { ref as storageRef } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { resizeImage } from "../helpers/resize-image";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [, setLocation] = useLocation();
  const [uploadFile] = useUploadFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      // 100 MB
      alert("File troppo grande. Selezionane una altro e riprova.");
      return;
    }
    setUploading(true);
    const coll = file.type.startsWith("image/")
      ? "foto"
      : file.type.startsWith("video/")
      ? "video"
      : null;
    if (!coll) {
      console.error("Invalid file type", file.type);
      alert("Tipo di file non supportato. Riprova.");
      setUploading(false);
      return;
    }
    const fileToUpload =
      coll === "foto" ? await resizeImage({ file, maxSize: 2000 }) : file;
    if (!fileToUpload) {
      console.error("Resize failed", file);
      alert("Errore durante il caricamento. Riprova.");
      setUploading(false);
      return;
    }
    // upload file
    const uuid = v4();
    const ref = storageRef(storage, coll + "/" + uuid);
    const result = await uploadFile(ref, fileToUpload);
    const path = result?.metadata.fullPath;
    if (!path) {
      console.error("Upload failed", fileToUpload, result);
      alert("Errore durante il caricamento. Riprova.");
      setUploading(false);
      return;
    }
    console.log("Uploaded", result);
    // create reference in db
    const docRef = await addDoc(collection(db, coll), {
      path,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    setFile(null);
    setUploading(false);
    setUploaded(true);
    return true;
  };

  return (
    <div className="page-container">
      <h1>Social-E</h1>
      <div className="homepage-content">
        {uploaded ? (
          <h3>File caricato!</h3>
        ) : file ? (
          <button className="upload-button" onClick={() => setFile(null)}>
            <Icon icon="ph:trash" />
            <h2>Cancella</h2>
          </button>
        ) : (
          <button
            className="upload-button"
            onClick={(e) => {
              e.preventDefault();
              inputRef.current?.click();
            }}
          >
            <Icon icon="ph:plus" />
            <h2>Contribuisci</h2>
          </button>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png, video/mp4"
          onChange={handleFileChange}
          className="file-input"
          ref={inputRef}
        />

        {!uploading && <FilePreview file={file} />}

        {file && (
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            <Icon icon="ph:check" />
            <h2>
              {uploading ? "Caricamento in corso..." : "Conferma e carica"}
            </h2>
          </button>
        )}
        {!file && (
          <>
            <button
              className="upload-button"
              onClick={() => setLocation("/foto")}
            >
              <Icon icon="ph:image-square" />
              <h2>Vai alle foto</h2>
            </button>
            <button
              className="upload-button"
              onClick={() => setLocation("video")}
            >
              <Icon icon="ph:video" />
              <h2>Vai ai video</h2>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

const FilePreview = ({ file }: { file: File | null }) => {
  if (!file) {
    return null;
  }
  if (file.type.startsWith("image/")) {
    return (
      <img
        className="file-preview"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
    );
  }
  if (file.type.startsWith("video/")) {
    return (
      <video
        className="file-preview"
        src={URL.createObjectURL(file)}
        controls
      />
    );
  }
};

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../helpers/firebase";
import Masonry from "react-responsive-masonry";
import { useEffect, useMemo, useState } from "react";
import VideoPreview from "../components/VideoPreview";
import Spinner from "../components/Spinner";

const Video = () => {
  const [collectionValue, loading] = useCollection(
    query(collection(db, "video"), orderBy("timestamp", "desc"))
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const columnsCount = useMemo(() => {
    if (windowWidth < 992) {
      return 1;
    }
    if (windowWidth < 1200) {
      return 2;
    }
    if (windowWidth < 1500) {
      return 3;
    }
    return 4;
  }, [windowWidth]);

  if (!collectionValue && loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      {collectionValue && (
        <Masonry columnsCount={columnsCount} gutter="10px">
          {collectionValue?.docs.map((doc) => {
            return (
              <VideoPreview
                key={doc.id}
                path={doc.data().path}
                docRef={doc.ref}
              />
            );
          })}
        </Masonry>
      )}
    </div>
  );
};

export default Video;

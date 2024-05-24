import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../helpers/firebase";
import ImagePreview from "../components/ImagePreview";
import Masonry from "react-responsive-masonry";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../components/Spinner";

const Foto = () => {
  const [collectionValue, loading] = useCollection(
    query(collection(db, "foto"), orderBy("timestamp", "desc"))
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
      return 2;
    }
    if (windowWidth < 1200) {
      return 3;
    }
    if (windowWidth < 1500) {
      return 4;
    }
    return 5;
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
              <ImagePreview
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

export default Foto;

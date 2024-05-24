import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import ImagePreview from "../components/ImagePreview";
import Masonry from "react-responsive-masonry";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../components/Spinner";
import Lightbox from "../components/Lightbox";

type FotoPageProps = {
  collectionValue: QuerySnapshot | undefined;
  loading: boolean;
};

const Foto = ({ collectionValue, loading }: FotoPageProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentImage, setCurrentImage] =
    useState<QueryDocumentSnapshot | null>(null);

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
                onClick={() => setCurrentImage(doc)}
              />
            );
          })}
        </Masonry>
      )}
      {currentImage && (
        <Lightbox onClose={() => setCurrentImage(null)}>
          <ImagePreview
            key={currentImage.id}
            path={currentImage.data().path}
            docRef={currentImage.ref}
            fullScreen
          />
        </Lightbox>
      )}
    </div>
  );
};

export default Foto;

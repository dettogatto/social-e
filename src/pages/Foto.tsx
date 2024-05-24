import { QuerySnapshot } from "firebase/firestore";
import ImagePreview from "../components/ImagePreview";
import Masonry from "react-responsive-masonry";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../components/Spinner";

type FotoPageProps = {
  collectionValue: QuerySnapshot | undefined;
  loading: boolean;
};

const Foto = ({ collectionValue, loading }: FotoPageProps) => {
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

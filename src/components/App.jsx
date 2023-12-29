import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchImages } from "services/photoService";
import { STATUSES } from "utils/constants";
import { Loader } from "./Loader/Loader";

export const App = () => {

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUSES.idle);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const newSearchText = e.currentTarget.elements.searchText.value;

    if (searchText !== newSearchText) {
      setSearchText(newSearchText);
      setData(null);
      setPage(1);
      setHasMounted(true)
    }
  }

  const getImages = async (searchText, page) => {
    try {
      setStatus(STATUSES.pending)
      const data = await fetchImages(searchText, page);
      setStatus(STATUSES.success);
      const showLoader = page < Math.ceil(data.totalHits/12)
      setLoadMore(showLoader)
      return data;
    }
    catch (error){
      setError(error.message);
      setStatus(STATUSES.error);
    }
  }

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (hasMounted) {
      getImages(searchText, page).then(fetchData => {
      setData(prevData => prevData ? [...prevData, ...fetchData.hits] : fetchData.hits )
    })
    }
  }, [page, searchText, hasMounted])

    return (
      <div>
        <Searchbar onSubmit={onSubmit}/>
        <ImageGallery data={data}></ImageGallery>
        {data && loadMore && <Button onLoadMore={onLoadMore}></Button>}
        {status === STATUSES.pending && <Loader></Loader>}
      </div>
    );
};

//1) Обратите внимание, пожалуйста на hasMounted. Верно ли так бороться с двойным рендером? Или есть другие способы? Если не трудно - расскажите о них ))
//2) в useEffect prevData, нужно ли через prevData или можно просто обращаться к data из state ?
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { fetchImages } from './api/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
export const App = () => {
  const [fetchedImages, setFetchedImages] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleFetchImages = async currentSearch => {
    setLoadingStatus(true);
    const searchQueryTrimed = await currentSearch.trim();
    try {
      const response = await fetchImages(searchQueryTrimed, page);
      setLoadingStatus(false);
      if (response.totalHits === 0) {
        Notiflix.Notify.failure('Something went wrong, try again.');
        return;
      }
      const images = response.hits.map(img => ({
        id: img.id,
        webformatURL: img.webformatURL,
        largeImageURL: img.largeImageURL,
        tags: img.tags,
      }));
      const imgsArr = [...fetchedImages, ...images];
      setFetchedImages(imgsArr);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, query) => {
    e.preventDefault();
    setFetchedImages([]);
    setCurrentSearch(query);
    setTotalHits(0);
    setPage(1);
    const data = await handleFetchImages(query);
    if (data) {
      setTotalHits(data.totalHits);
    } else return;
  };

  useEffect(() => {
    if (totalHits === 0) return;
    const totalPagesAmount = Math.ceil(totalHits / 12);
    setTotalPages(totalPagesAmount);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }, [totalHits]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      handleFetchImages(currentSearch);
    }

    console.log(page);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loadingStatus && <Loader />}
      {totalHits !== 0 && (
        <ImageGallery
          images={fetchedImages}
          page={page}
          totalPages={totalPages}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

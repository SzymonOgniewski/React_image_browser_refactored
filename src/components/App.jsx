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
    const searchQueryTrimed = currentSearch.trim();
    if (currentSearch.length !== 0) {
      setLoadingStatus(true);

      try {
        const response = await fetchImages(searchQueryTrimed, page);
        setTotalHits(response.totalHits);

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
    } else return;
  };

  const handleSubmit = async (e, query) => {
    e.preventDefault();
    setFetchedImages([]);
    setCurrentSearch(query);
    setTotalHits(0);
    setPage(1);
  };
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      await handleFetchImages(currentSearch);
    };
    fetch();
  }, [page, currentSearch]);
  useEffect(() => {
    if (totalHits === 0) return;
    const totalPagesAmount = Math.ceil(totalHits / 12);
    setTotalPages(totalPagesAmount);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }, [totalHits]);

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

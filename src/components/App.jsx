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
  const [totalPages, setTotalPages] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleSubmit = async (e, query) => {
    e.preventDefault();
    if (query === currentSearch) return;
    setFetchedImages([]);
    setCurrentSearch(query);
    setPage(1);
  };
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (currentSearch.length === 0) return;
    const handleFetchImages = async () => {
      setLoadingStatus(true);
      try {
        const response = await fetchImages(currentSearch, page);
        const perPage = 12;
        setTotalPages(Math.ceil(response.totalHits / perPage));
        Notiflix.Notify.success(
          `Hooray! We found ${response.totalHits} images.`
        );

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
        setFetchedImages(state => [...state, ...images]);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchImages();
  }, [page, currentSearch]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loadingStatus && <Loader />}
      <ImageGallery
        images={fetchedImages}
        page={page}
        totalPages={totalPages}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [library, setLibrary] = useState(() => {
    const savedLibrary = localStorage.getItem('gameZoneLibrary');
    return savedLibrary ? JSON.parse(savedLibrary) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameZoneLibrary', JSON.stringify(library));
  }, [library]);

  const addToLibrary = (game) => {
    if (!isInLibrary(game.id)) {
      setLibrary((prev) => [...prev, game]);
    }
  };

  const removeFromLibrary = (gameId) => {
    setLibrary((prev) => prev.filter((game) => game.id !== gameId));
  };

  const isInLibrary = (gameId) => {
    return library.some((game) => game.id === gameId);
  };

  return (
    <LibraryContext.Provider value={{ library, addToLibrary, removeFromLibrary, isInLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary mütləq LibraryProvider daxilində işlədilməlidir!');
  }
  return context;
};
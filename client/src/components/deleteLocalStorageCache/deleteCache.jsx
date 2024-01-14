import React, { useEffect } from 'react';

const DeleteCache = () => {
   useEffect(() => {
      const clearLocalStorageOnReload = () => {
         const localStorageItemsToDelete = ['clickedDocter'];
         localStorageItemsToDelete.forEach((itemName) => {
            localStorage.removeItem(itemName);
         });
      };

      window.addEventListener('beforeunload', clearLocalStorageOnReload);
      return () => {
         window.removeEventListener('beforeunload', clearLocalStorageOnReload);
      };
   }, []);

   return <div>Your React component content goes here.</div>;
};

export default DeleteCache;

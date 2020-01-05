import React, {Context, createContext, useState} from 'react';

interface LoadingContext {
  loading: string;
  changeLoading: (isLoading: boolean) => void;
}

const LoadingContext: Context<LoadingContext> = createContext({
  changeLoading: (isLoading: boolean) => {
    if (isLoading) {
      return;
    }
    return;
  },
  loading: 'false',
});

const LoadingProvider: React.FC = ({children}) => {
  const [loadingState, setLoading] = useState({
    loading: 'false',
  });

  const changeLoading = (isLoading: boolean) => {
    setLoading({
      loading: isLoading ? 'true' : 'false',
    });
  };

  return (
    <LoadingContext.Provider
      value={{
        changeLoading,
        loading: loadingState.loading,
      }}>
      {children}
    </LoadingContext.Provider>
  );
};

export {LoadingProvider, LoadingContext};

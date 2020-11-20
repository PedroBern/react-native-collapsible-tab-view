import React from 'react';

const useRefresh = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isRefreshing]);

  return [
    isRefreshing,
    () => {
      setIsRefreshing(true);
    },
  ] as const;
};

export default useRefresh;

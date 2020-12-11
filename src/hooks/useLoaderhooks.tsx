import axios from 'axios';
import { useState, useEffect } from 'react';

const useLoaders = (url: string, deps: any[] = []) => {
  // 使用 useEffect 完成副作用操作，赋值给 useEffect 的函数会在组件渲染到屏幕之后
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return [data, loading];
};
export default useLoaders;

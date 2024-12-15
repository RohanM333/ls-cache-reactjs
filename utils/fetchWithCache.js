// src/utils/fetchWithCache.js

const fetchWithCache = async (url, cacheKey, cacheTime = 5 * 60 * 1000) => {
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}_time`);

  if (cachedData && cachedTime && (Date.now() - cachedTime < cacheTime)) {
    return JSON.parse(cachedData);
  }

  const response = await fetch(url);
  const data = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

  return data;
};

export default fetchWithCache;

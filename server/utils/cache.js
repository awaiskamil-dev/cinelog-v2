const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day

const getCached = (key) => {
  const entry = cache.get(key);
  if(!entry) return null;

  if(Date.now() - entry.timestamp > CACHE_DURATION){
    cache.delete(key);
    return null;
  }
  return entry.data;
}

const setCached = (key, data) => {
  cache.set(key, {data, timestamp: Date.now()});
};

module.exports = {
  getCached,
  setCached
};
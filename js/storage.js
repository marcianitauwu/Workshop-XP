export const Storage = {
  load(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(_){ return fallback; }
  },
  save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key){ localStorage.removeItem(key); }
};

export const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  };
  
  export const getFromLocalStorage = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error('Ошибка при загрузке из localStorage:', error);
      return defaultValue;
    }
  };
  
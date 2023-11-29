import { useState } from "react";

export default function usePersistedState(key, defaltValue) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);

    if (persistedState) {
      return JSON.parse(persistedState);
    }
    return defaltValue;
  });

  const setPersistedState = (value) => {
      setState(value);
      let serilalizedValue;

    if (typeof(value)=== 'function') {
        serilalizedValue = JSON.stringify(value(state));
    }else{
        serilalizedValue= JSON.stringify(value);
    }

    localStorage.setItem(key, serilalizedValue);
  };

  return [state, setPersistedState];
}

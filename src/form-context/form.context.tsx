import React, { createContext, useEffect, useRef } from 'react';
import { reducer, initialState } from './form.reducer';

const FormsStateContext = createContext({});
const FormsDispatchContext = createContext<any>(() => void null);

type FormProviderProps = {
  children: React.ReactNode;
};

const FormsProvider: React.FC<FormProviderProps> = ({ children }) => {
  const isInitialized = useRef(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    if (isInitialized && isInitialized.current) {
      return;
    }
    
    isInitialized.current = true;
  }, []);

  return (
    <FormsStateContext.Provider value={state}>
      <FormsDispatchContext.Provider value={dispatch}>{children}</FormsDispatchContext.Provider>
    </FormsStateContext.Provider>
  );
};

function useFormsState() {
  const context = React.useContext(FormsStateContext);
  if (context === undefined) {
    throw new Error('useFormsState must be used within a FormsProvider');
  }
  return context;
}

function useFormsDispatch() {
  const context = React.useContext(FormsDispatchContext);
  if (context === undefined) {
    throw new Error('useFormsDispatch must be used within a FormsProvider');
  }
  return context;
}

export { FormsProvider, useFormsState, useFormsDispatch };

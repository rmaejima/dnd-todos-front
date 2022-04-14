import React from 'react';
import { useAllTodos } from 'utils/apis/todo';

const App: React.VFC = () => {
  const { data } = useAllTodos();
  console.log(data);
  return <>hello world</>;
};

export default App;

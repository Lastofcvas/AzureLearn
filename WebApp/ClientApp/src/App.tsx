import { useEffect, useState } from 'react';
import './App.css';

const App = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hello, setHello] = useState<string | null>(null);


  const API_URL: string = 'https://azure-demo-func.azurewebsites.net/graphql';
  const query: string = `
    query greet {
      hello
    }`;
  

  const setResponse = async (): Promise<void> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    });

    const json = await response.json();

    setHello(json.data.hello);
  }

  useEffect(() => {
    setResponse();
  }, []);

  return (
    <div className="App">
      {isLoading ? 'loading...' : hello}
    </div>
  );
}

export default App;

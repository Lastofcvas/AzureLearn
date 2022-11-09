import { useEffect, useState } from 'react';

const App = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hello, setHello] = useState<string | null>(null);

  const API_URL: string = 'https://azure-demo-func.azurewebsites.net/api/HttpExample';
  
  const setResponse = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      });
  
      const json = await response.json();
      
      setHello(json.hello);
    }
    finally {
      setLoading(false);
    }
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

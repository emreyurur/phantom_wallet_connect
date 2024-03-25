import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Doğru yolu kullanın
import 'react-native-get-random-values';
import NetworkSelectScreen from './src/screens/NetworkSelectScreen';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NetworkSelectScreen />
    </Provider>
  );
};

export default App;

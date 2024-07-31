import React from 'react';
import {SafeAreaView} from 'react-native';
import FilterScreen from './components/FilterScreen';
import SearchLocations from './components/SearchLocations';
import LocationSearch from './components/LocationSearch';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <FilterScreen /> */}
      <SearchLocations />
      {/* <LocationSearch /> */}
    </SafeAreaView>
  );
};

export default App;

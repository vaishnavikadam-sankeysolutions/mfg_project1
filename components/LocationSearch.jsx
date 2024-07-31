import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

const LocationSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const searchUser = async text => {
    const url = `http://10.0.2.2:3000/locations?q=${text}`;
    try {
      let result = await fetch(url);
      if (result.ok) {
        let data = await result.json();
        setSearchResults(data);

        // Add the search text to recent searches if it's not already in the list
        if (!recentSearches.some(item => item.title === text)) {
          setRecentSearches([
            ...recentSearches,
            {id: Date.now().toString(), title: text},
          ]);
        }
      } else {
        console.warn('Error fetching data');
      }
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  useEffect(() => {
    if (searchText) {
      searchUser(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter location, address, charger"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <TouchableOpacity style={styles.locationButton}>
        <Text style={styles.locationButtonText}>My location</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <Text style={styles.recentSearchesTitle}>Recent searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.recentSearchItem}>
            <Text style={styles.recentSearchTitle}>{item.title}</Text>
          </View>
        )}
      />
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.resultAddress}>{item.address}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentSearchItem: {
    marginBottom: 10,
  },
  recentSearchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultAddress: {
    fontSize: 14,
    color: 'gray',
  },
});

export default LocationSearch;

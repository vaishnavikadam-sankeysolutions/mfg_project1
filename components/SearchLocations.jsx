// import React, {useState} from 'react';
// import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';

// const SearchLocations = () => {
//   const [searchText, setSearchText] = useState('');
//   const [locations, setLocations] = useState([]);

//   const searchUser = async text => {
//     setSearchText(text);
//     const url = `http://10.0.2.2:3000/locations?q=${text}`;
//     try {
//       let result = await fetch(url);
//       if (result.ok) {
//         let data = await result.json();
//         setLocations(data);
//       } else {
//         console.warn('Error fetching data');
//       }
//     } catch (error) {
//       console.warn('Error:', error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter location, address, charger"
//         style={styles.searchBox}
//         value={searchText}
//         onChangeText={text => searchUser(text)}
//       />
//       <FlatList
//         data={locations}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <View style={styles.locationItem}>
//             <Text style={styles.locationName}>{item.name}</Text>
//             <Text>{item.country}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchBox: {
//     fontSize: 20,
//     borderColor: 'black',
//     borderWidth: 1,
//     margin: 15,
//     shadowColor: 'blue',
//     elevation: 0.5,
//     opacity: 5,
//   },
//   locationItem: {
//     padding: 10,
//     borderBottomColor: 'gray',
//     borderBottomWidth: 1,
//   },
//   locationName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SearchLocations;

import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';

const SearchLocations = () => {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);

  const searchUser = async text => {
    setSearchText(text);
    const url = `http://10.0.2.2:3000/locations?q=${text}`;
    try {
      let result = await fetch(url);
      if (result.ok) {
        let data = await result.json();
        setLocations(data);
      } else {
        console.warn('Error fetching data');
      }
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter location, address, charger"
        style={styles.searchBox}
        value={searchText}
        onChangeText={text => searchUser(text)}
      />
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.country}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  searchBox: {
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    padding: 10,
    borderRadius: 5,
  },
  locationItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchLocations;

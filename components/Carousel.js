import React, { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, View, StyleSheet, Image, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPictures } from "../api";

const Carousel = () => {
  const [pictures, setPictures] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const screenWidth = Dimensions.get("window").width;

  const fetchPictures = async () => {
    try {
      const picturesData = await getPictures(userId);
      setPictures(picturesData.data);
      console.log(picturesData);
    } catch (error) {
      console.error('Get pictures error:', error.message);
    }
  };

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        }
      } catch (error) {
        console.error('Get userId error:', error.message);
      }
    };

    loadUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPictures();
    }
  }, [userId]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex < pictures.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
    }, 3000); // Adjust the interval time as needed (here it's set to 3 seconds)

    return () => clearInterval(scrollInterval);
  }, [currentIndex, pictures.length]);

  const renderImageItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const renderIndicator = () => (
    <View style={styles.indicatorContainer}>
      {pictures.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            { backgroundColor: index === currentIndex ? 'orange' : 'gray' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={pictures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImageItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {renderIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get("window").width,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    marginTop: 10,
    textAlign:'center',
    fontWeight:'500',
    fontSize:20,
    color: 'black',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:60
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default Carousel;

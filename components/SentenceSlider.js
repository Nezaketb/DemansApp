import React, { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, View, StyleSheet, Text } from "react-native";
import { getSentences } from "../api";

const SentenceSlider = () => {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const screenWidth = Dimensions.get("window").width;

  const fetchSentences = async () => {
    try {
      const sentencesData = await getSentences();
      setSentences(sentencesData.data);
      //console.log(sentencesData);
    } catch (error) {
      console.error('Get sentences error:', error.message);
    }
  };

  useEffect(() => {
      fetchSentences();
  },);
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex < sentences.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [currentIndex, sentences.length]);

  const renderTextItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={sentences}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTextItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:-90
  },
  slide: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
  }
});

export default SentenceSlider;

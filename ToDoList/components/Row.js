import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Row({ item, data, setData }) {
  // Tehtävän tilan vaihtaminen
  const done = () => {
    const updatedData = data.map((task) =>
      task.id === item.id ? { ...task, completed: !task.completed } : task
    );
    setData(updatedData);
  };

  // Tehtävän poistaminen
  const remove = () => {
    const arrayWithoutRemoved = data.filter((task) => task.id !== item.id);
    setData(arrayWithoutRemoved);
  };

  return (
    <SafeAreaView style={styles.row}>
      <Pressable onPress={done} style={{ flex: 1 }}>
        <Text style={[
          styles.rowText,
          item.completed ? styles.completedText : null
        ]}>
          {item.name}
        </Text>
      </Pressable>
      <Ionicons name='trash' size={24} onPress={remove} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  rowText: {
    fontSize: 24,
    padding: 4,
    margin: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  }
});

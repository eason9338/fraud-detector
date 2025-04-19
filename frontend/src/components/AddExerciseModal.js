import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import { theme } from '../styles/theme';
import { config } from '../config';

const AddExerciseModal = ({ visible, onClose, onAdd }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('chest');
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/exercise/categories`);
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        Alert.alert('錯誤', '拿取健身種類時發生錯誤');
      }
    };
  
    fetchCategories();
  }, [visible]);

  const fetchExercises = async (category) => {
    try {
      const id = category.id;
      setSelectedCategory(id);
      const response = await fetch(`${config.baseURL}/api/exercise/category/${id}`);
      const data = await response.json();
      setExercises(data.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      Alert.alert('Error', 'Failed to fetch exercises');
    }
  };

  const renderCategoryButton = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive
      ]}
      onPress={() => fetchExercises(item)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item && styles.categoryButtonTextActive
      ]}>
        {item.zh}
      </Text>
    </TouchableOpacity>
  );

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.exerciseListItem}
      onPress={() => onAdd(item)}  
    >
      <View>
        <Text style={styles.exerciseItemTitle}>{item.name}</Text>
        <Text style={styles.exerciseItemDescription}>{item.description}</Text>
        <View style={styles.tagContainer}>
          {item.targetMuscles.map((muscle, index) => (
            <Text key={index} style={styles.exerciseItemTag}>
              {muscle}{index < item.targetMuscles.length - 1 ? ', ' : ''}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalButtonText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>新增動作</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalButtonTextPrimary}>完成</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="搜尋動作"
            />
          </View>

          <View style={styles.categoriesContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={renderCategoryButton}
              keyExtractor={item => item.id.toString()}
            />
          </View>

          <FlatList
            style={styles.exerciseList}
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal base styles
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.cardBg,
    marginTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  // Search styles
  searchContainer: {
    padding: theme.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: theme.spacing.small,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
  },

  // Categories styles
  categoriesContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    marginHorizontal: theme.spacing.xsmall,
    marginVertical: theme.spacing.small,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryButtonText: {
    color: theme.colors.secondaryText,
    fontSize: theme.fontSize.small,
  },
  categoryButtonTextActive: {
    color: theme.colors.cardBg,
  },

  // Exercise list styles
  exerciseList: {
    flex: 1,
  },
  exerciseListItem: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.cardBg,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
  },

  // Typography styles
  modalTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    color: theme.colors.text,
  },
  modalButtonText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.secondaryText,
  },
  modalButtonTextPrimary: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  exerciseItemTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    marginBottom: theme.spacing.xsmall,
    color: theme.colors.text,
  },
  exerciseItemDescription: {
    fontSize: theme.fontSize.small,
    color: theme.colors.secondaryText,
    marginBottom: theme.spacing.small,
  },
  exerciseItemTag: {
    fontSize: theme.fontSize.xsmall,
    color: theme.colors.primary,
  },
});

export default AddExerciseModal;
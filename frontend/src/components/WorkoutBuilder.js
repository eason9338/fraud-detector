import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';
import AddExerciseModal from './AddExerciseModal';

const WorkoutBuilder = ({
  mode = 'workout', // 'workout' or 'template'
  exercises,
  recordName,
  onExercisesChange,
  onNameChange,
  onSubmit,
  submitButtonText,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addSet = (exerciseId) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === exerciseId) {
        const newSetId = exercise.sets.length + 1;
        return {
          ...exercise,
          sets: [...exercise.sets, { id: newSetId, weight: '', reps: '' }]
        };
      }
      return exercise;
    });
    onExercisesChange(updatedExercises);
  };

  const deleteSet = (exerciseId, setId) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === exerciseId) {
        const updatedSets = exercise.sets.filter(set => set.id !== setId);
        const newSets = updatedSets.map((set, index) => ({
          ...set,
          id: index + 1
        }));
        return {
          ...exercise,
          sets: newSets
        };
      }
      return exercise;
    });
    onExercisesChange(updatedExercises);
  };

  const addExercise = (exercise) => {
    const updatedExercises = [
      ...exercises,
      {
        id: exercise._id,
        name: exercise.name,
        sets: [{ id: 1, weight: '', reps: '' }]
      }
    ];
    onExercisesChange(updatedExercises);
    setIsModalVisible(false);
  };

  const deleteExercise = (exerciseId) => {
    const updatedExercises = exercises.filter(exercise => exercise.id !== exerciseId);
    onExercisesChange(updatedExercises);
  };

  const updateSet = (exerciseId, setId, field, value) => {
    const updatedExercises = exercises.map(exercise => {
      if(exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: exercise.sets.map(set => {
            if(set.id === setId) {
              return { ...set, [field]: value };
            }
            return set;
          })
        }  
      }
      return exercise;
    });
    onExercisesChange(updatedExercises);
  };

  return (
    <SafeAreaView style={styles.baseContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder={mode === 'workout' ? '輸入訓練名稱' : '輸入模板名稱'}
            value={recordName}
            onChangeText={onNameChange}
            placeholderTextColor={theme.colors.secondaryText}
          />
        </View>
        
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseTitle}>{exercise.name}</Text>
              <TouchableOpacity
                style={styles.deleteExerciseButton}
                onPress={() => deleteExercise(exercise.id)}
              >
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {mode === 'workout' ? (
              <>
              {exercise.sets.map((set) => (
                <View key={set.id}>
                  <View style={styles.exerciseRow}>
                    <Text style={styles.exerciseNumber}>{set.id}</Text>
                    
                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.exerciseInput}
                          placeholder="重量 (kg)"
                          keyboardType="numeric"
                          value={set.weight}
                          onChangeText={(value) => updateSet(exercise.id, set.id, 'weight', value)}
                        />
                      </View>
                      
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.exerciseInput}
                          placeholder="次數"
                          keyboardType="numeric"
                          value={set.reps}
                          onChangeText={(value) => updateSet(exercise.id, set.id, 'reps', value)}
                        />
                      </View>

                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteSet(exercise.id, set.id)}
                      >
                        <Ionicons name="remove-circle-outline" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  

                </View>
              ))}
              
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addSet(exercise.id)}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              
              </>
              ) : null }


          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.halfWidthButton]}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.actionButtonText}>新增動作</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.halfWidthButton, styles.finishButton]}
          onPress={onSubmit}
        >
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>{submitButtonText}</Text>
        </TouchableOpacity>
      </View>
      
      <AddExerciseModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={addExercise}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    baseContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flex: 1,
      marginBottom: 80, // Add space for bottom buttons
    },
    exerciseContainer: {
      backgroundColor: theme.colors.cardBg,
      borderRadius: 12,
      margin: theme.spacing.medium,
      padding: theme.spacing.medium,
      ...theme.shadows.small,
    },
    nameInputContainer: {
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.background,
    },
    nameInput: {
      backgroundColor: theme.colors.cardBg,
      borderRadius: 12,
      padding: theme.spacing.medium,
      fontSize: theme.fontSize.large,
      color: theme.colors.text,
      ...theme.shadows.small,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputWrapper: {
      flex: 1,
      marginHorizontal: theme.spacing.small/2,
    },
    addButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.small,
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.medium,
    },
  
    exerciseTitle: {
      fontSize: theme.fontSize.large,
      fontWeight: '600',
      flex: 1, // 讓標題能夠彈性佔據空間
    },
    exerciseNumber: {
      width: 30,
      fontSize: theme.fontSize.medium,
      color: theme.colors.secondaryText,
    },
    exerciseRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.small,
    },
    exerciseInput: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      padding: theme.spacing.small,
      fontSize: theme.fontSize.medium,
      color: theme.colors.text,
    },
    addButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
     },
    deleteButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#A7A7A7',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: theme.spacing.small,
    },
    deleteExerciseButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#ef4444',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing.medium,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    bottomButtonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.background,
    },
    actionButton: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      padding: theme.spacing.medium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    halfWidthButton: {
      flex: 0.48,
    },
    actionButtonText: {
      color: theme.colors.cardBg,
      fontSize: theme.fontSize.medium,
      fontWeight: '600',
      marginLeft: theme.spacing.small,
    },
    finishButton: {
      backgroundColor: '#34C759',
    },
  });

export default WorkoutBuilder;
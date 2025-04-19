import React, { useState, useEffect } from 'react';
import {
  Alert,
} from 'react-native';
import { authStorage } from '../utils/auth';
import WorkoutBuilder from '../components/WorkoutBuilder';
import { config } from '../config';
import { useNavigation, useRoute } from '@react-navigation/native';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddWorkoutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('Route params:', route.params);

  console.log('Initial exercises:', route.params?.plan || []);

  const [exercises, setExercises] = useState([]);

  console.log('Current exercises state:', exercises);


  const [recordName, setRecordName] = useState('');

  useEffect(() => {
    setExercises([]);
    if (route.params?.plan) {
      const exercisesWithSets = route.params.plan.map(exercise => ({
        ...exercise,
        sets: [{ id: 1, weight: '', reps: '' }]
      }));
      setExercises(exercisesWithSets);
    }
    setRecordName(route.params?.name || '')
  }, [route.params]);

  const handleCreateRecord = async () => {
    const token = await authStorage.getToken();
    const name = recordName || `${formatDate(new Date())}的訓練`;

    try {
      const response = await fetch(`${config.baseURL}/api/record/createRecord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          exercises
        }),
      });

      const data = await response.json();
      if(data.success) {
        Alert.alert('完成', '訓練已成功建立', [
          {
            text: '確定',
            onPress: () => {
              setExercises([]);
              setRecordName('');
              navigation.navigate('Profile');
            }
          }
        ]);
      } else {
        Alert.alert('錯誤', '建立訓練中發生錯誤');
        console.log(data);
      }
    } catch (error) {
      console.error('Error creating record:', error);
      Alert.alert('錯誤', '網絡連接錯誤');
    }
  }

  return (
    <WorkoutBuilder
      mode="workout"
      exercises={exercises}
      recordName={recordName}
      onExercisesChange={setExercises}
      onNameChange={setRecordName}
      onSubmit={handleCreateRecord}
      submitButtonText="完成訓練"
    />
  )
};

export default AddWorkoutPage;
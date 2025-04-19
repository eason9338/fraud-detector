import React, { useState } from 'react';
import {
  Alert,
} from 'react-native';
import { authStorage } from '../utils/auth';
import WorkoutBuilder from '../components/WorkoutBuilder';
import { config } from '../config';
import { useNavigation } from '@react-navigation/native';

const AddWorkoutPlanPage = () => {
    const navigation = useNavigation();
    const [exercises, setExercises] = useState([]);
    const [recordName, setRecordName] = useState('');
  
    const handleCreateTemplate = async () => {
      const token = await authStorage.getToken();
      
      try {
        const response = await fetch(`${config.baseURL}/api/plan/createPlan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: recordName,
            exercises
          }),
        });
  
        const data = await response.json();
        if(data.success) {
          Alert.alert('完成', '訓練模板已成功建立', [
            {
              text: '確定',
              onPress: () => {
                setExercises([]);
                setRecordName('');
                navigation.navigate('ProfileMain');
              }
            }
          ]);
        } else {
          Alert.alert('錯誤', '建立模板中發生錯誤');
          console.log(data);
        }
      } catch (error) {
        console.error('Error creating template:', error);
        Alert.alert('錯誤', '網絡連接錯誤');
      }
    };
  
    return (
      <WorkoutBuilder
        mode="template"
        exercises={exercises}
        recordName={recordName}
        onExercisesChange={setExercises}
        onNameChange={setRecordName}
        onSubmit={handleCreateTemplate}
        submitButtonText="儲存模板"
      />
    );
  };

export default AddWorkoutPlanPage;
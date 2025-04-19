import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    Touchable
} from 'react-native';

import { theme } from '../styles/theme';
import { authStorage } from '../utils/auth';
import { config } from '../config'
import { useNavigation, useIsFocused } from '@react-navigation/native';

const WorkoutPlansTab = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [plans, setPlans] = useState();
    // [
    //     {
    //       "id": "675a8905b54108693718ac36",
    //       "name": "test test",
    //       "exercises": [
    //         {
    //           "id": "674d6ccc3e9f05239ec24448",
    //           "name": "傳統臥推"
    //         }
    //       ]
    //     },
    //     {
    //       "id": "675a8ae1b54108693718ac51",
    //       "name": "Test2",
    //       "exercises": [
    //         {
    //           "id": "674d6ccc3e9f05239ec24452",
    //           "name": "肩推舉"
    //         }
    //       ]
    //     }
    //   ]

    const handleGetPlan = async () => {
        try {
            const user = await authStorage.getUser();
            const userId = user.id;
            const response = await fetch(`${config.baseURL}/api/plan/getPlanByUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
    
            console.log('Response status:', response.status);
            const data = await response.json();
            
            if (data.success) { 
                console.log('successfully get plans');
                
                const formattedData = data.data.map(plan => {
                    // 篩選掉exercise為null的項目，只保留有效的運動項目
                    const validExercises = plan.exercises
                        .filter(ex => ex.exercise !== null)
                        .map(ex => ({
                            id: ex.exercise._id,
                            name: ex.exercise.name
                        }));
                    
                    return {
                        id: plan._id,
                        name: plan.name,
                        exercises: validExercises
                    };
                });
                
                console.log('formatted data:', formattedData);
                setPlans(formattedData);
            } else {
                console.log('failed to load plans')
            }
        } catch (error) {
            console.error('Error in handleGetPlan:', error);
        }
    }

    // const handleUsePlan = () => {
        
    //     const fetch(`${config.baseURL}/api/plan/getPlan/${planId}`)
    // }

    useEffect(() => {
        if(isFocused) {
            handleGetPlan()
        }
    }, [isFocused])

    return (
        <ScrollView style={styles.tabContainer}>
            <TouchableOpacity 
                style={styles.addPlanButton}
                onPress={() => navigation.navigate('AddWorkoutPlan')}
            >
                <Text style={styles.addPlanButtonText}>新增健身計畫</Text>
            </TouchableOpacity>
            
            {/* Example workout plan cards */}
            <View>
                {plans ? (
                    plans.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            style={styles.planCard}
                            onPress={() => navigation.navigate('AddWorkout', {
                                plan: plan.exercises,
                                name: plan.name
                            })}
                        >
                            <Text style={styles.planTitle}>{plan.name}</Text>
                            <Text style={styles.planDescription}>{plan.exercises.map(ex => ex.name).join(' • ')}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>目前還沒有健身計畫，點擊上方按鈕新增計畫</Text>
                )}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    addPlanButton: {
        backgroundColor: theme.colors.primary,
        margin: 15,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addPlanButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    planCard: {
        backgroundColor: '#fff',
        margin: 15,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    planTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    planDescription: {
        fontSize: 14,
        color: '#666',
    },
})

export default WorkoutPlansTab;
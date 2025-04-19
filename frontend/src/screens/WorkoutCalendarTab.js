import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { theme } from '../styles/theme';
import RecordModal from '../components/RecordDetailModal';
import { authStorage } from '../utils/auth';
import { config } from '../config';


const WorkoutCalendarTab = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [recordData, setRecordData] = useState(null);

    const markedDates = {
        '2024-12-01': { 
            marked: true, 
            dotColor: theme.colors.secondary
        },
        '2024-12-03': { 
            marked: true, 
            dotColor: theme.colors.secondary 
        },
        ...(selectedDate ? {
            [selectedDate]: { 
                selected: true,
                selectedColor: theme.colors.primary,
                selectedTextColor: theme.colors.textLight
            }
        } : {})
    };

    const getRecordData = async (date) => {
        try {
            const userData = await authStorage.getUser();
    
            const response = await fetch(`${config.baseURL}/api/record/getRecord/${userData.id}/${date}`);
            const data = await response.json();
            
            if (data.success) {
                setRecordData(data.data);
            }
        } catch (error) {
            console.error('Error fetching record data:', error);
        }
    };

    const handleDayPress = (day) => {
        const newDate = day.dateString;
        setSelectedDate(newDate);
        setModalVisible(true);
        // 直接使用 newDate 而不是依賴 selectedDate
        getRecordData(newDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                    theme={{
                        todayTextColor: theme.colors.primary,
                        dayTextColor: theme.colors.text,
                        textDisabledColor: theme.colors.textTertiary,
                        monthTextColor: theme.colors.text,
                        textSectionTitleColor: theme.colors.textSecondary,
                        
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                        
                        textDayFontWeight: '400',
                        textMonthFontWeight: '600',
                        textDayHeaderFontWeight: '500',
                        
                        arrowColor: theme.colors.primary,
                        
                        'stylesheet.day.basic': {
                            base: {
                                width: 32,
                                height: 32,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            selected: {
                                backgroundColor: theme.colors.primary,
                                borderRadius: 8,
                            },
                            today: {
                                backgroundColor: theme.colors.primaryLight,
                                borderRadius: 8,
                            }
                        },
                    }}
                    style={styles.calendar}
                />
            </View>
            
            <RecordModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedDate={selectedDate}
                recordData={recordData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surfaceLight,
    },
    calendarContainer: {
        paddingBottom: 10,
    },
    calendar: {
        height: 320,
        borderRadius: 12,
        padding: 10,
        backgroundColor: theme.colors.surfaceLight,
    },
    content: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        marginTop: 10,
    },
    title: {
        fontSize: theme.fontSize.large,
        color: theme.colors.text,
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: theme.radius.medium,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.textLight,
        fontSize: theme.fontSize.medium,
        fontWeight: '500',
    }
});

export default WorkoutCalendarTab;
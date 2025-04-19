import { StyleSheet } from 'react-native'

export const theme = StyleSheet.create({
  colors: {
    // Primary Colors - 主色系列
    primary: '#2563eb',           // 更現代的藍色
    primaryLight: '#B0D2FD',      // 淺色變體
    primaryDark: '#1e40af',       // 深色變體
    
    // Secondary Colors - 輔助色系列
    secondary: '#10b981',         // 綠色，用於成功/完成狀態
    secondaryLight: '#34d399',
    secondaryDark: '#059669',

    // Accent Colors - 強調色系列
    accent: '#f59e0b',           // 黃色，用於警告/提醒
    danger: '#ef4444',           // 紅色，用於錯誤/刪除
    info: '#6366f1',             // 紫色，用於資訊提示

    // Neutral Colors - 中性色系列
    background: '#f8fafc',       // 更淺的背景色
    surfaceLight: '#ffffff',     // 表面色（淺）
    surfaceDark: '#f1f5f9',     // 表面色（深）
    cardBg: '#ffffff',
    
    // Text Colors - 文字色系列
    text: '#0f172a',            // 主要文字
    textSecondary: '#475569',   // 次要文字
    textTertiary: '#94a3b8',    // 第三級文字
    textLight: '#ffffff',       // 淺色文字
    
    // Border Colors - 邊框色系列
    border: '#e2e8f0',          // 一般邊框
    borderLight: '#f1f5f9',     // 淺色邊框
    borderDark: '#cbd5e1',      // 深色邊框
    borderBottom: '#D675FF',
  },
  
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
    xxl: 48,
  },
  
  fontSize: {
    xs: 12,
    small: 14,
    medium: 16,
    large: 18,
    xl: 24,
    xxl: 32,
  },
  
  radius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    }
  },
  
  // 新增常用組合樣式
  components: {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
    },
    button: {
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '@store';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization';
import { spacing, typography } from '@theme';
import { AppButton, Input, Card, CardBody, AppText } from '@components';
import { isValidEmail } from '@utils';
import { useNavigation } from '@react-navigation/native';

type AuthNavigationProp = {
  navigate: (screen: 'Register' | 'ForgotPassword') => void;
};

// Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .test('is-email', 'Invalid email format', isValidEmail),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<AuthNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        reset();
        // Navigation will be handled by the auth state change
      } else {
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleRegisterPress = () => {
    // Navigate to register screen
    navigation.navigate('Register');
  };

  const handleForgotPasswordPress = () => {
    // Navigate to forgot password screen
    // navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText variant="h1" style={[styles.title, { color: theme.colors.text }]}>
            {t('auth.welcomeBack')}
          </AppText>
          <AppText variant="body" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {t('auth.signIn')} to continue
          </AppText>
        </View>

        <Card style={styles.formCard}>
          <CardBody>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth.email')}
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth.password')}
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  showPasswordToggle
                  required
                />
              )}
            />

            <AppButton
              title={isLoading ? t('common.loading') : t('auth.signIn')}
              onPress={handleSubmit(onSubmit)}
              // disabled={!isValid || isLoading}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />

            {error && (
              <AppText variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </AppText>
            )}

            <View style={styles.forgotPasswordContainer}>
              <AppButton
                title={t('auth.forgotPassword')}
                variant="primary"
                size="small"
                onPress={handleForgotPasswordPress}
              />
            </View>
          </CardBody>
        </Card>

        <View style={styles.footer}>
          <AppText variant="body" style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            {t('auth.dontHaveAccount')}{' '}
          </AppText>
          <AppButton
            title={t('auth.createAccount')}
            variant="ghost"
            size="small"
            onPress={handleRegisterPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.screenPadding,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: spacing.xl,
  },
  loginButton: {
    marginTop: spacing.lg,
  },
  errorText: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
  },
});

export default LoginScreen;

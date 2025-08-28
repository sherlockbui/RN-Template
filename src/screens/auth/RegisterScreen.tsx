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
import { checkPasswordStrength, isValidEmail } from '@/utils';
import { Card, CardBody, Input, AppButton, AppText, useAuthStore, useTheme, useTranslation, spacing, typography } from '@/index';

// Validation schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .test('is-email', 'Invalid email format', isValidEmail),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test('password-strength', 'Password is too weak', (value) => {
      if (!value) return false;
      const strength = checkPasswordStrength(value);
      return strength.score >= 3;
    }),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // In a real app, you would call the register function
      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => {
              reset();
              // Navigate to login screen
              // navigation.navigate('Login');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleLoginPress = () => {
    // Navigate to login screen
    // navigation.navigate('Login');
  };

  const getPasswordStrengthColor = () => {
    if (!password) return theme.colors.textTertiary;
    const strength = checkPasswordStrength(password);
    if (strength.score >= 4) return theme.colors.success;
    if (strength.score >= 3) return theme.colors.warning;
    return theme.colors.error;
  };

  const getPasswordStrengthText = () => {
    if (!password) return '';
    const strength = checkPasswordStrength(password);
    if (strength.score >= 4) return 'Strong';
    if (strength.score >= 3) return 'Good';
    if (strength.score >= 2) return 'Fair';
    return 'Weak';
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
            {t('auth.createAccount')}
          </AppText>
          <AppText variant="body" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Join us and start your journey
          </AppText>
        </View>

        <Card style={styles.formCard}>
          <CardBody>
            <View style={styles.nameRow}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('profile.firstName')}
                    placeholder="First name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.firstName?.message}
                    style={styles.nameInput}
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('profile.lastName')}
                    placeholder="Last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.lastName?.message}
                    style={styles.nameInput}
                    required
                  />
                )}
              />
            </View>

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
                  placeholder="Create a password"
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

            {password && (
              <View style={styles.passwordStrength}>
                <AppText variant="caption" style={[styles.strengthText, { color: getPasswordStrengthColor() }]}>
                  Password strength: {getPasswordStrengthText()}
                </AppText>
              </View>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth.confirmPassword')}
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry={!showConfirmPassword}
                  showPasswordToggle
                  required
                />
              )}
            />

            <AppButton
              title={isLoading ? t('common.loading') : t('auth.signUp')}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading}
              loading={isLoading}
              fullWidth
              style={styles.registerButton}
            />

            {error && (
              <AppText variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </AppText>
            )}
          </CardBody>
        </Card>

        <View style={styles.footer}>
          <AppText variant="body" style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            {t('auth.alreadyHaveAccount')}{' '}
          </AppText>
          <AppButton
            title={t('auth.signIn')}
            variant="ghost"
            size="small"
            onPress={handleLoginPress}
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
  nameRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nameInput: {
    flex: 1,
  },
  registerButton: {
    marginTop: spacing.lg,
  },
  errorText: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  passwordStrength: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  strengthText: {
    ...typography.caption,
    textAlign: 'center',
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

export default RegisterScreen;

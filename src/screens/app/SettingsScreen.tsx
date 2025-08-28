import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization';
import { useAuthStore } from '@store';
import { spacing, typography } from '@theme';
import { AppButton, Card, CardBody, CardHeader, AppText } from '@components';
import { LANGUAGES, type LanguageCode } from '@localization';
import { getAppVersion } from '@utils';

const SettingsScreen: React.FC = () => {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleThemeChange = (value: boolean) => {
    if (value) {
      setColorScheme('dark');
    } else {
      setColorScheme('light');
    }
  };

  const handleLanguageChange = (languageCode: LanguageCode) => {
    // In a real app, you would call the language manager
    Alert.alert('Language Changed', `Language changed to ${LANGUAGES[languageCode].name}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully!'),
          style: 'destructive',
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => Alert.alert('Success', 'Settings reset successfully!'),
          style: 'destructive',
        },
      ]
    );
  };

  const renderSettingItem = (
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <AppText variant="h5" style={[styles.settingTitle, { color: theme.colors.text }]}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
            {subtitle}
          </AppText>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const renderSwitchSetting = (
    title: string,
    subtitle: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <AppText variant="h5" style={[styles.settingTitle, { color: theme.colors.text }]}>
          {title}
        </AppText>
        <AppText variant="caption" style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </AppText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.borderLight,
          true: theme.colors.primary,
        }}
        thumbColor={value ? theme.colors.textInverse : theme.colors.textTertiary}
      />
    </View>
  );

  const renderThemeSection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Appearance
        </AppText>
      </CardHeader>
      <CardBody>
        {renderSwitchSetting(
          'Dark Theme',
          'Switch between light and dark themes',
          colorScheme === 'dark',
          handleThemeChange
        )}
        <View style={styles.themeOptions}>
          <AppText variant="bodySmall" style={[styles.themeLabel, { color: theme.colors.textSecondary }]}>
            Theme Options:
          </AppText>
          <View style={styles.themeButtons}>
            <AppButton
              title="Light"
              variant={colorScheme === 'light' ? 'primary' : 'outline'}
              size="small"
              onPress={() => setColorScheme('light')}
              style={styles.themeButton}
            />
            <AppButton
              title="Dark"
              variant={colorScheme === 'dark' ? 'primary' : 'outline'}
              size="small"
              onPress={() => setColorScheme('dark')}
              style={styles.themeButton}
            />
          </View>
        </View>
      </CardBody>
    </Card>
  );

  const renderLanguageSection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Language
        </AppText>
      </CardHeader>
      <CardBody>
        {Object.values(LANGUAGES).map((language: any) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => handleLanguageChange(language.code)}
          >
            <View style={styles.languageContent}>
              <AppText variant="h4" style={styles.languageFlag}>{language.flag}</AppText>
              <AppText variant="body" style={[styles.languageName, { color: theme.colors.text }]}>
                {language.name}
              </AppText>
            </View>
            {language.code === 'en' && (
              <AppText variant="caption" style={[styles.currentLanguage, { color: theme.colors.primary }]}>
                Current
              </AppText>
            )}
          </TouchableOpacity>
        ))}
      </CardBody>
    </Card>
  );

  const renderNotificationSection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Notifications
        </AppText>
      </CardHeader>
      <CardBody>
        {renderSwitchSetting(
          'Push Notifications',
          'Receive push notifications',
          notifications,
          setNotifications
        )}
        {renderSwitchSetting(
          'Email Notifications',
          'Receive email notifications',
          emailNotifications,
          setEmailNotifications
        )}
      </CardBody>
    </Card>
  );

  const renderPrivacySection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Privacy & Security
        </AppText>
      </CardHeader>
      <CardBody>
        {renderSwitchSetting(
          'Location Services',
          'Allow app to access location',
          locationServices,
          setLocationServices
        )}
        {renderSwitchSetting(
          'Biometric Authentication',
          'Use fingerprint or face ID',
          biometricAuth,
          setBiometricAuth
        )}
        {renderSettingItem(
          'Change Password',
          'Update your account password',
          undefined,
          () => Alert.alert('Change Password', 'Password change feature coming soon!')
        )}
      </CardBody>
    </Card>
  );

  const renderDataSection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Data & Storage
        </AppText>
      </CardHeader>
      <CardBody>
        {renderSettingItem(
          'Clear Cache',
          'Free up storage space',
          undefined,
          handleClearCache
        )}
        {renderSettingItem(
          'Export Data',
          'Download your data',
          undefined,
          () => Alert.alert('Export Data', 'Data export feature coming soon!')
        )}
        {renderSettingItem(
          'Reset Settings',
          'Restore default settings',
          undefined,
          handleResetSettings
        )}
      </CardBody>
    </Card>
  );

  const renderAboutSection = () => (
    <Card style={styles.sectionCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </AppText>
      </CardHeader>
      <CardBody>
        {renderSettingItem(
          'Version',
          `v${getAppVersion().version} (${getAppVersion().buildNumber})`
        )}
        {renderSettingItem(
          'Terms of Service',
          'Read our terms and conditions',
          undefined,
          () => Alert.alert('Terms', 'Terms of service coming soon!')
        )}
        {renderSettingItem(
          'Privacy Policy',
          'Read our privacy policy',
          undefined,
          () => Alert.alert('Privacy', 'Privacy policy coming soon!')
        )}
      </CardBody>
    </Card>
  );

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <AppButton
        title="Logout"
        variant="ghost"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {renderThemeSection()}
      {renderLanguageSection()}
      {renderNotificationSection()}
      {renderPrivacySection()}
      {renderDataSection()}
      {renderAboutSection()}
      {renderActions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionCard: {
    margin: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    fontWeight: typography.fontWeight.semiBold,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  settingContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    ...typography.caption,
  },
  themeOptions: {
    marginTop: spacing.md,
  },
  themeLabel: {
    ...typography.bodySmall,
    marginBottom: spacing.sm,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeButton: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  languageName: {
    ...typography.body,
  },
  currentLanguage: {
    ...typography.caption,
    fontWeight: typography.fontWeight.medium,
  },
  actionsContainer: {
    padding: spacing.screenPadding,
    marginBottom: spacing.xl,
  },
  logoutButton: {
    marginBottom: spacing.sm,
  },
});

export default SettingsScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization';
import { useAuthStore } from '@store';
import { spacing, typography } from '@theme';
import { AppButton, Card, CardBody, CardHeader, Input, AppText } from '@components';
import { formatDate } from '@utils';

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { user, updateUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedUser({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
  };

  const handleSavePress = () => {
    if (!editedUser.firstName.trim() || !editedUser.lastName.trim()) {
      Alert.alert('Error', 'First name and last name are required.');
      return;
    }

    updateUser({
      firstName: editedUser.firstName.trim(),
      lastName: editedUser.lastName.trim(),
      email: editedUser.email.trim(),
    });

    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelPress = () => {
    setIsEditing(false);
    setEditedUser({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            logout();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary }]}>
        <AppText variant="h1" style={[styles.avatarText, { color: theme.colors.textInverse }]}>
          {user?.firstName?.charAt(0) || 'U'}
        </AppText>
      </View>
      <AppText variant="h2" style={[styles.userName, { color: theme.colors.text }]}>
        {user?.firstName} {user?.lastName}
      </AppText>
      <AppText variant="body" style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
        {user?.email}
      </AppText>
              <AppText variant="bodySmall" style={[styles.userRole, { color: theme.colors.textTertiary }]}>
          {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
        </AppText>
    </View>
  );

  const renderProfileForm = () => (
    <Card style={styles.formCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Personal Information
        </AppText>
      </CardHeader>
      <CardBody>
        <Input
          label="First Name"
          value={editedUser.firstName}
          onChangeText={(text: string) => setEditedUser({ ...editedUser, firstName: text })}
          placeholder="Enter first name"
          required
        />
        <Input
          label="Last Name"
          value={editedUser.lastName}
          onChangeText={(text: string) => setEditedUser({ ...editedUser, lastName: text })}
          placeholder="Enter last name"
          required
        />
        <Input
          label="Email"
          value={editedUser.email}
          onChangeText={(text: string) => setEditedUser({ ...editedUser, email: text })}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
      </CardBody>
    </Card>
  );

  const renderAccountInfo = () => (
    <Card style={styles.infoCard}>
      <CardHeader>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Account Information
        </AppText>
      </CardHeader>
      <CardBody>
        <View style={styles.infoRow}>
          <AppText variant="bodySmall" style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
            User ID:
          </AppText>
          <AppText variant="body" style={[styles.infoValue, { color: theme.colors.text }]}>
            {user?.id}
          </AppText>
        </View>
        <View style={styles.infoRow}>
          <AppText variant="bodySmall" style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
            Member since:
          </AppText>
          <AppText variant="body" style={[styles.infoValue, { color: theme.colors.text }]}>
            {formatDate(user?.createdAt || new Date())}
          </AppText>
        </View>
        <View style={styles.infoRow}>
          <AppText variant="bodySmall" style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
            Last updated:
          </AppText>
          <AppText variant="body" style={[styles.infoValue, { color: theme.colors.text }]}>
            {formatDate(user?.updatedAt || new Date())}
          </AppText>
        </View>
      </CardBody>
    </Card>
  );

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      {isEditing ? (
        <View style={styles.editActions}>
          <AppButton
            title="Save"
            onPress={handleSavePress}
            style={styles.actionButton}
          />
          <AppButton
            title="Cancel"
            variant="outline"
            onPress={handleCancelPress}
            style={styles.actionButton}
          />
        </View>
      ) : (
        <AppButton
          title="Edit Profile"
          variant="outline"
          onPress={handleEditPress}
          fullWidth
        />
      )}
    </View>
  );

  const renderDangerZone = () => (
    <Card style={styles.dangerCard}>
      <CardHeader>
        <AppText variant="h4" style={[styles.dangerTitle, { color: theme.colors.error }]}>
          Danger Zone
        </AppText>
      </CardHeader>
      <CardBody>
        <AppButton
          title="Logout"
          variant="ghost"
          onPress={handleLogout}
          style={styles.dangerButton}
        />
        <AppButton
          title="Delete Account"
          variant="danger"
          onPress={handleDeleteAccount}
          style={styles.dangerButton}
        />
      </CardBody>
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {renderProfileHeader()}

      {isEditing ? renderProfileForm() : renderAccountInfo()}

      {renderActions()}

      {renderDangerZone()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: spacing.screenPadding,
    paddingTop: spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.h1,
    fontWeight: typography.fontWeight.bold,
  },
  userName: {
    ...typography.h2,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  userEmail: {
    ...typography.body,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  userRole: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
  formCard: {
    margin: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  infoCard: {
    margin: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    fontWeight: typography.fontWeight.semiBold,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    ...typography.bodySmall,
  },
  infoValue: {
    ...typography.bodySmall,
    fontWeight: typography.fontWeight.medium,
  },
  actionsContainer: {
    padding: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  dangerCard: {
    margin: spacing.screenPadding,
    marginBottom: spacing.xl,
  },
  dangerTitle: {
    ...typography.h4,
    fontWeight: typography.fontWeight.semiBold,
  },
  dangerButton: {
    marginBottom: spacing.sm,
  },
});

export default ProfileScreen;

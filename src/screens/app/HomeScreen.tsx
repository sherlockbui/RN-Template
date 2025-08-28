import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization';
import { useAuthStore } from '@store';
import { spacing, typography } from '@theme';
import { AppButton, Card, CardBody, CardHeader, AppText } from '@components';
import { apiService } from '@services/api';
import { formatDate, formatNumber } from '@utils';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch posts from JSONPlaceholder API
      const postsResponse = await apiService.get<Post[]>('/posts?_limit=10');
      setPosts(postsResponse);
      
      // Fetch users from JSONPlaceholder API
      const usersResponse = await apiService.get<User[]>('/users?_limit=5');
      setUsers(usersResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
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

  const renderPostItem = ({ item }: { item: Post }) => {
    const user = users.find(u => u.id === item.userId);
    
    return (
      <Card style={styles.postCard} onPress={() => Alert.alert('Post', item.title)}>
        <CardHeader>
          <AppText variant="h5" style={[styles.postTitle, { color: theme.colors.text }]}>
            {item.title}
          </AppText>
        </CardHeader>
        <CardBody>
          <AppText variant="body" style={[styles.postBody, { color: theme.colors.textSecondary }]}>
            {item.body}
          </AppText>
          {user && (
            <AppText variant="caption" style={[styles.postAuthor, { color: theme.colors.textTertiary }]}>
              By {user.name}
            </AppText>
          )}
        </CardBody>
      </Card>
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <Card style={styles.userCard} onPress={() => Alert.alert('User', item.name)}>
      <CardBody>
        <AppText variant="h6" style={[styles.userName, { color: theme.colors.text }]}>
          {item.name}
        </AppText>
        <AppText variant="bodySmall" style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
          {item.email}
        </AppText>
        <AppText variant="caption" style={[styles.userUsername, { color: theme.colors.textTertiary }]}>
          @{item.username}
        </AppText>
      </CardBody>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <AppText variant="body" style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading...
        </AppText>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <AppText variant="h2" style={[styles.welcomeText, { color: theme.colors.text }]}>
          {t('home.welcome')}, {user?.firstName || 'User'}!
        </AppText>
        <AppText variant="body" style={[styles.description, { color: theme.colors.textSecondary }]}>
          {t('home.description')}
        </AppText>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <CardBody>
            <AppText variant="h1" style={[styles.statNumber, { color: theme.colors.primary }]}>
              {formatNumber(posts.length)}
            </AppText>
            <AppText variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Posts
            </AppText>
          </CardBody>
        </Card>

        <Card style={styles.statCard}>
          <CardBody>
            <AppText variant="h1" style={[styles.statNumber, { color: theme.colors.secondary }]}>
              {formatNumber(users.length)}
            </AppText>
            <AppText variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Users
            </AppText>
          </CardBody>
        </Card>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Posts
        </AppText>
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Active Users
        </AppText>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.usersList}
        />
      </View>

      <View style={styles.actionsContainer}>
        <AppButton
          title="Refresh Data"
          variant="outline"
          onPress={fetchData}
          style={styles.actionButton}
        />
        <AppButton
          title="Logout"
          variant="ghost"
          onPress={handleLogout}
          style={styles.actionButton}
        />
      </View>

      <View style={styles.footer}>
        <AppText variant="caption" style={[styles.footerText, { color: theme.colors.textTertiary }]}>
          Last updated: {formatDate(new Date())}
        </AppText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
  },
  header: {
    padding: spacing.screenPadding,
    alignItems: 'center',
  },
  welcomeText: {
    ...typography.h2,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h1,
    textAlign: 'center',
  },
  statLabel: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.screenPadding,
  },
  postCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  postTitle: {
    ...typography.h5,
    fontWeight: typography.fontWeight.semiBold,
  },
  postBody: {
    ...typography.body,
    lineHeight: typography.lineHeight.relaxed,
    marginBottom: spacing.sm,
  },
  postAuthor: {
    ...typography.caption,
    fontStyle: 'italic',
  },
  usersList: {
    paddingHorizontal: spacing.screenPadding,
  },
  userCard: {
    width: 200,
    marginRight: spacing.md,
  },
  userName: {
    ...typography.h6,
    fontWeight: typography.fontWeight.semiBold,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  userUsername: {
    ...typography.caption,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  footer: {
    padding: spacing.screenPadding,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
  },
});

export default HomeScreen;

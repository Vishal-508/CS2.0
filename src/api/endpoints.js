const API_ENDPOINTS = {
  // Auth
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  ME: '/api/auth/me',
  LOGOUT: '/api/auth/logout',

  // Issues
  ISSUES: '/api/issues',
  USER_ISSUES: '/api/issues/user',
  SINGLE_ISSUE: '/api/issues/:id',

  // Votes
  VOTE: '/api/votes/:issueId',
  CHECK_VOTE: '/api/votes/check/:issueId',

  // Analytics
  CATEGORY_ANALYTICS: '/api/analytics/categories',
  SUBMISSION_ANALYTICS: '/api/analytics/submissions',
  MOST_VOTED_ANALYTICS: '/api/analytics/most-voted',

  // Map
  MAP_ISSUES: '/api/map',
//   MAP_ISSUES: '/api/map',

  // Additional
  CATEGORIES: '/api/categories',
  STATUSES: '/api/statuses',
};

export default API_ENDPOINTS;
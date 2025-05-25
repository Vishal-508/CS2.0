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
  VOTE: '/api/vote/issues/:issueId/upvote',
  CHECK_VOTE: '/api/vote/issues/:issueId/vote-status',
  DELETE_VOTE:'/api/vote/issues/:issueId/vote',

  // Analytics
  CATEGORY_ANALYTICS: '/api/analytics/category-count',
  SUBMISSION_ANALYTICS: '/api/analytics/daily-submissions',
  MOST_VOTED_ANALYTICS: '/api/analytics/most-voted',

  // Map
  MAP_ISSUES: '/api/map'
};

export default API_ENDPOINTS;
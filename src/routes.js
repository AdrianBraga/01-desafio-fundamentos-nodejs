export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.end('List Task!');
    },
  },
]
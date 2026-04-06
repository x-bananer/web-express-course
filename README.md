# Express course

## Authentication and Authorization Rules

- `POST /api/v1/auth/login` authenticates a user with `username` and `password` and returns a JWT token.
- `GET /api/v1/auth/me` requires a Bearer token and returns the authenticated user from `res.locals.user`.
- Passwords are hashed with `bcrypt` when creating a user and when updating a user's password.
- `PUT /api/v1/users/:id` and `DELETE /api/v1/users/:id` require authentication.
- Regular users can update or delete only their own user data.
- Admin users can update or delete any user.
- `POST /api/v1/cats` requires authentication, and the cat owner is taken from the authenticated user token.
- `PUT /api/v1/cats/:id` and `DELETE /api/v1/cats/:id` require authentication.
- Regular users can update or delete only cats they own.
- Admin users can update or delete any cat.
- JWT tokens are verified in `src/middlewares/authentication.js`, and decoded user data is stored in `res.locals.user`.

# NestJS Boilerplate

A comprehensive, production-ready NestJS boilerplate with TypeScript, featuring authentication, authorization, file management, and a complete blog system with posts, categories, and tags.

## 🚀 Features

### Core Features

- **NestJS Framework** - Progressive Node.js framework for building efficient server-side applications
- **TypeScript** - Full TypeScript support with strict type checking
- **PostgreSQL Database** - Relational database with TypeORM integration
- **JWT Authentication** - Secure authentication with access and refresh tokens
- **Social Authentication** - Login with Google, Facebook, and Apple
- **Role-based Authorization** - Admin and user roles with guards
- **File Upload** - Support for local storage, AWS S3, and S3 presigned URLs
- **Internationalization** - Multi-language support with i18n
- **Email Service** - Email notifications and templates
- **Swagger Documentation** - Auto-generated API documentation
- **Rate Limiting** - API rate limiting and security
- **Validation** - Request validation with class-validator
- **Testing** - Unit and E2E tests with Jest

### Blog System Features

- **Posts Management** - Full CRUD operations for blog posts
- **Categories** - Hierarchical category system
- **Tags** - Many-to-many tagging system
- **Media Management** - Featured images and file attachments
- **SEO Optimization** - Meta tags, keywords, and descriptions
- **Publishing System** - Draft, published, and archived statuses
- **View Counter** - Track post views
- **Slug Generation** - SEO-friendly URLs

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Docker (optional, for containerized setup)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd nestjs-boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment example file:

```bash
cp env-example-relational .env
```

Configure your environment variables in `.env`:

```env
NODE_ENV=development
APP_PORT=3000
APP_NAME="NestJS API"
API_PREFIX=api
FRONTEND_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:3000

# Database
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=nestjs_boilerplate

# JWT Secrets (generate with: npm run app:config)
AUTH_JWT_SECRET=your_jwt_secret
AUTH_REFRESH_SECRET=your_refresh_secret
AUTH_FORGOT_SECRET=your_forgot_secret
AUTH_CONFIRM_EMAIL_SECRET=your_confirm_email_secret

# Social Auth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# File Storage
FILE_DRIVER=local
# For S3: s3 or s3-presigned
ACCESS_KEY_ID=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_REGION=us-east-1
AWS_DEFAULT_S3_BUCKET=your-bucket-name

# Email (optional)
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_IGNORE_TLS=true
MAIL_SECURE=false
MAIL_REQUIRE_TLS=false
MAIL_DEFAULT_EMAIL=noreply@example.com
MAIL_DEFAULT_NAME="No Reply"
MAIL_CLIENT_PORT=1080
```

### 4. Database Setup

Run database migrations:

```bash
npm run migration:run
```

Seed the database with initial data:

```bash
npm run seed:run:relational
```

### 5. Generate JWT Secrets

Generate secure JWT secrets:

```bash
npm run app:config
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Using Docker

```bash
docker-compose up -d
```

## 📖 API Documentation

Once the application is running, you can access:

- **Swagger UI**: `http://localhost:3000/docs`
- **API**: `http://localhost:3000/api/v1`

## 🔐 Authentication

The API uses JWT tokens for authentication:

### Admin Login

```bash
POST /api/v1/auth/email/login
{
  "email": "admin@example.com",
  "password": "secret"
}
```

### User Registration

```bash
POST /api/v1/auth/email/register
{
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Social Authentication

- `POST /api/v1/auth/google/login`
- `POST /api/v1/auth/facebook/login`
- `POST /api/v1/auth/apple/login`

## 📝 API Endpoints

### Posts

- `GET /api/v1/posts` - List posts with pagination
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create post (Admin only)
- `PATCH /api/v1/posts/:id` - Update post (Admin only)
- `DELETE /api/v1/posts/:id` - Delete post (Admin only)

### Categories

- `GET /api/v1/categories` - List categories
- `GET /api/v1/categories/:id` - Get single category
- `POST /api/v1/categories` - Create category (Admin only)
- `PATCH /api/v1/categories/:id` - Update category (Admin only)
- `DELETE /api/v1/categories/:id` - Delete category (Admin only)

### Tags

- `GET /api/v1/tags` - List tags
- `GET /api/v1/tags/:id` - Get single tag
- `POST /api/v1/tags` - Create tag (Admin only)
- `PATCH /api/v1/tags/:id` - Update tag (Admin only)
- `DELETE /api/v1/tags/:id` - Delete tag (Admin only)

### Users

- `GET /api/v1/users` - List users (Admin only)
- `GET /api/v1/users/:id` - Get user (Admin only)
- `POST /api/v1/users` - Create user (Admin only)
- `PATCH /api/v1/users/:id` - Update user (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Files

- `POST /api/v1/files/upload` - Upload file
- `GET /api/v1/files/:path` - Get file

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication module
├── users/                # User management
├── posts/                # Blog posts
├── categories/           # Post categories
├── tags/                 # Post tags
├── files/                # File management
├── mail/                 # Email service
├── config/               # Configuration
├── database/             # Database config & migrations
├── utils/                # Shared utilities
└── i18n/                 # Internationalization
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

### Docker E2E Tests

```bash
npm run test:e2e:relational:docker
```

## 📊 Database Management

### Create Migration

```bash
npm run migration:create -- src/database/migrations/CreateNewTable
```

### Generate Migration

```bash
npm run migration:generate -- src/database/migrations/AddNewColumn
```

### Run Migrations

```bash
npm run migration:run
```

### Revert Migration

```bash
npm run migration:revert
```

## 🎨 Code Generation

### Generate Resource

```bash
npm run generate:resource:relational
```

### Add Property to Resource

```bash
npm run add:property:to-relational
```

## 🔧 Development Tools

### Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Ensure all required environment variables are set:

- `NODE_ENV=production`
- Database connection details
- JWT secrets
- File storage configuration
- Email service configuration

## 📚 Documentation

Additional documentation is available in the `/docs` folder:

- [Architecture](./docs/architecture.md)
- [Authentication](./docs/auth.md)
- [Database](./docs/database.md)
- [File Uploading](./docs/file-uploading.md)
- [Installing and Running](./docs/installing-and-running.md)
- [Tests](./docs/tests.md)
- [Translations](./docs/translations.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database management with [TypeORM](https://typeorm.io/)
- Authentication with [JWT](https://jwt.io/)
- API documentation with [Swagger](https://swagger.io/)

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

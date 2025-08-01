import { PostEntity } from '../../../../posts/infrastructure/persistence/relational/entities/post.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CategoryEntity } from '../../../../categories/infrastructure/persistence/relational/entities/category.entity';

export const postSeeds: PostEntity[] = [
  {
    id: 1,
    title: 'Getting Started with NestJS',
    slug: 'getting-started-with-nestjs',
    excerpt:
      'Learn the basics of NestJS framework and how to build scalable Node.js applications.',
    content: `# Getting Started with NestJS

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

## Why NestJS?

- **TypeScript Support**: Built with TypeScript from the ground up
- **Modular Architecture**: Organize your code into modules
- **Dependency Injection**: Powerful DI container
- **Decorators**: Extensive use of decorators for clean code
- **Testing**: Built-in testing utilities

## Installation

\`\`\`bash
npm i -g @nestjs/cli
nest new project-name
\`\`\`

This is a comprehensive guide to get you started with NestJS development.`,
    status: 'published',
    isActive: true,
    featuredImage: 'https://nestjs.com/img/logo-small.svg',
    featuredImageAlt: 'NestJS Logo',
    metaKeywords: 'nestjs, nodejs, typescript, framework, backend',
    metaDescription:
      'Learn the basics of NestJS framework and how to build scalable Node.js applications.',
    viewCount: 125,
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    author: { id: 1 } as UserEntity,
    category: { id: 1 } as CategoryEntity,
  } as PostEntity,
  {
    id: 2,
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    excerpt:
      'Discover essential TypeScript best practices for writing maintainable and type-safe code.',
    content: `# TypeScript Best Practices

TypeScript has become an essential tool for JavaScript developers. Here are some best practices to help you write better TypeScript code.

## 1. Use Strict Mode

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## 2. Prefer Interfaces over Types

For object shapes, prefer interfaces:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

## 3. Use Utility Types

Leverage TypeScript's built-in utility types:

\`\`\`typescript
type PartialUser = Partial<User>;
type UserEmail = Pick<User, 'email'>;
\`\`\`

These practices will help you write more maintainable TypeScript code.`,
    status: 'published',
    isActive: true,
    featuredImage: 'https://www.typescriptlang.org/favicon-32x32.png',
    featuredImageAlt: 'TypeScript Logo',
    metaKeywords: 'typescript, best practices, javascript, types',
    metaDescription:
      'Discover essential TypeScript best practices for writing maintainable and type-safe code.',
    viewCount: 89,
    publishedAt: new Date('2024-01-20T14:30:00Z'),
    author: { id: 1 } as UserEntity,
    category: { id: 3 } as CategoryEntity,
  } as PostEntity,
  {
    id: 3,
    title: 'Building RESTful APIs with NestJS',
    slug: 'building-restful-apis-with-nestjs',
    excerpt:
      'Complete guide to building robust RESTful APIs using NestJS framework.',
    content: `# Building RESTful APIs with NestJS

Learn how to create robust and scalable RESTful APIs using the NestJS framework.

## Setting Up Controllers

Controllers are responsible for handling incoming requests:

\`\`\`typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return \`This returns user #\${id}\`;
  }
}
\`\`\`

## Services and Dependency Injection

Services contain business logic:

\`\`\`typescript
@Injectable()
export class UsersService {
  findAll(): User[] {
    // Implementation here
  }
}
\`\`\`

## Validation

Use class-validator for request validation:

\`\`\`typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
\`\`\`

This guide covers everything you need to build production-ready APIs.`,
    status: 'published',
    isActive: true,
    featuredImage: null,
    featuredImageAlt: null,
    metaKeywords: 'nestjs, api, rest, backend, nodejs',
    metaDescription:
      'Complete guide to building robust RESTful APIs using NestJS framework.',
    viewCount: 156,
    publishedAt: new Date('2024-02-01T09:15:00Z'),
    author: { id: 1 } as UserEntity,
    category: { id: 3 } as CategoryEntity,
  } as PostEntity,
  {
    id: 4,
    title: 'Database Design Fundamentals',
    slug: 'database-design-fundamentals',
    excerpt: 'Essential principles of database design for modern applications.',
    content: `# Database Design Fundamentals

Proper database design is crucial for application performance and maintainability.

## Normalization

Understanding normal forms:

1. **First Normal Form (1NF)**: Eliminate repeating groups
2. **Second Normal Form (2NF)**: Eliminate partial dependencies
3. **Third Normal Form (3NF)**: Eliminate transitive dependencies

## Relationships

- **One-to-One**: User profile
- **One-to-Many**: User posts
- **Many-to-Many**: Posts and tags

## Indexing

Create indexes on frequently queried columns:

\`\`\`sql
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_published_at ON posts(published_at);
\`\`\`

## Performance Considerations

- Use appropriate data types
- Avoid over-indexing
- Consider query patterns
- Plan for scalability

Good database design sets the foundation for scalable applications.`,
    status: 'published',
    isActive: true,
    featuredImage: null,
    featuredImageAlt: null,
    metaKeywords: 'database, design, sql, normalization, performance',
    metaDescription:
      'Essential principles of database design for modern applications.',
    viewCount: 78,
    publishedAt: new Date('2024-02-10T11:00:00Z'),
    author: { id: 1 } as UserEntity,
    category: { id: 1 } as CategoryEntity,
  } as PostEntity,
  {
    id: 5,
    title: 'Advanced React Patterns',
    slug: 'advanced-react-patterns',
    excerpt:
      'Explore advanced React patterns for building scalable applications.',
    content: `# Advanced React Patterns

Take your React skills to the next level with these advanced patterns.

## Compound Components

Create flexible and reusable component APIs:

\`\`\`jsx
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

Modal.Header = function ModalHeader({ children }) {
  return <div className="modal-header">{children}</div>;
};

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
};
\`\`\`

## Render Props

Share code between components using render props:

\`\`\`jsx
function DataProvider({ render }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return render(data);
}
\`\`\`

## Custom Hooks

Extract component logic into reusable custom hooks:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });
  
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };
  
  return [value, setStoredValue];
}
\`\`\`

These patterns will help you build more maintainable React applications.`,
    status: 'draft',
    isActive: true,
    featuredImage: null,
    featuredImageAlt: null,
    metaKeywords: 'react, patterns, advanced, javascript, frontend',
    metaDescription:
      'Explore advanced React patterns for building scalable applications.',
    viewCount: 23,
    publishedAt: null,
    author: { id: 1 } as UserEntity,
    category: { id: 3 } as CategoryEntity,
  } as PostEntity,
];

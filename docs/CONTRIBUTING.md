# 🤝 Contributing Guidelines - BibleVerse

Thank you for considering contributing to BibleVerse! This document outlines the process for contributing to this project and helps maintain code quality and consistency.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Security](#security)

## 🤖 Code of Conduct

This project adheres to a code of conduct adapted from the Contributor Covenant. By participating, you are expected to uphold this code. Please report unacceptable behavior to [ap@aporkolab.com](mailto:ap@aporkolab.com).

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 22.22.3+ or 24.15.0+ and npm
- Git
- Angular CLI is used from `node_modules` (`npx ng ...`); a global install is optional
- Docker (optional, for containerized development)

### First Contribution

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/BibleVerse.git
   cd BibleVerse
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run start
   ```

## 🛠️ Development Setup

### Local Environment

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Run tests
npm run test

# Run linting
npm run lint
```

### Docker Environment

```bash
# Development with Docker
npm run docker:compose:dev

# Production-like testing
npm run docker:build
npm run docker:run
```

### Environment Configuration

The project supports multiple environments:
- **Development**: `src/environments/environment.development.ts`
- **Staging**: `src/environments/environment.staging.ts`
- **Production**: `src/environments/environment.ts`

## 🔄 Making Changes

### Branch Naming Convention

Use descriptive branch names with prefixes:

```
feature/add-search-functionality
bugfix/fix-verse-display-issue
hotfix/security-vulnerability
docs/update-contributing-guide
refactor/improve-service-architecture
```

### Development Workflow

1. **Create a feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Commit your changes** following commit guidelines

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** to the `develop` branch

## 🧪 Testing

### Test Types

- **Unit Tests**: Test individual components and services
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

### Running Tests

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:coverage

# Run all quality checks
npm run ci:quality
```

### Writing Tests

- Write tests for all new features and bug fixes
- Maintain minimum 80% code coverage
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

```typescript
describe('VerseService', () => {
  it('should return random verse when getRandomVerse is called', () => {
    // Arrange
    const service = TestBed.inject(VerseService);
    
    // Act
    const result = service.getRandomVerse();
    
    // Assert
    expect(result).toBeDefined();
    expect(result.book).toBeTruthy();
    expect(result.chapter).toBeGreaterThan(0);
  });
});
```

## 🎨 Code Style

### Formatting

- Use **Prettier** for consistent formatting
- Configuration in `.prettierrc.json`
- Run `npm run format` to auto-format code

### Linting

- Use **ESLint** for code quality
- Configuration in `eslint.config.js` (flat config)
- Run `npm run lint` to check code
- Run `npm run lint:fix` to auto-fix issues

### TypeScript Guidelines

```typescript
// ✅ Good
interface VerseResponse {
  readonly book: string;
  readonly chapter: number;
  readonly verse: number;
  readonly text: string;
}

class VerseService {
  private readonly apiUrl = 'https://szentiras.hu/api';
  
  public async getVerse(reference: string): Promise<VerseResponse> {
    // Implementation
  }
}

// ❌ Bad
interface verse {
  book: any;
  chapter;
  verse;
  text;
}
```

### Angular Style Guide

Follow the [Angular Style Guide](https://angular.io/guide/styleguide):

- Use kebab-case for file names
- Use PascalCase for class names
- Use camelCase for properties and methods
- Use UPPER_SNAKE_CASE for constants

## 📝 Commit Guidelines

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(search): add keyword search functionality"

# Bug fix
git commit -m "fix(display): resolve verse rendering issue on mobile"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat!: migrate to Angular 18"
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Code is properly documented
- [ ] Commit messages follow convention
- [ ] Branch is up to date with target branch

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
<!-- If applicable -->

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by at least one maintainer
3. **Testing** in staging environment (if applicable)
4. **Approval** and merge by maintainer

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
Clear and concise description

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g., macOS]
- Browser: [e.g., Chrome]
- Version: [e.g., 22]
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions considered

**Additional context**
Any other context or screenshots
```

## 🔒 Security

### Reporting Security Issues

**Do not** create public GitHub issues for security vulnerabilities. Instead:

1. Email security issues to [ap@aporkolab.com](mailto:ap@aporkolab.com)
2. Include detailed information about the vulnerability
3. Provide steps to reproduce if possible
4. Allow time for investigation and fix before public disclosure

### Security Best Practices

- Never commit secrets or API keys
- Use environment variables for configuration
- Follow OWASP security guidelines
- Keep dependencies updated
- Use security headers and CSP

## 📚 Documentation

### Code Documentation

- Document public APIs with JSDoc
- Include usage examples
- Document complex algorithms
- Update README when adding features

```typescript
/**
 * Retrieves a random Bible verse from the API
 * @param translation - Bible translation (optional)
 * @returns Promise resolving to verse data
 * @throws {ApiError} When API request fails
 * @example
 * ```typescript
 * const verse = await verseService.getRandomVerse('SZIT');
 * console.log(verse.text);
 * ```
 */
public async getRandomVerse(translation?: string): Promise<VerseResponse> {
  // Implementation
}
```

### Architecture Documentation

Update documentation when making architectural changes:
- Component interaction diagrams
- API documentation
- Database schemas (if applicable)
- Configuration options

## 🏷️ Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Test release candidate
5. Create GitHub release with tag
6. Deploy to production

## 🎉 Recognition

Contributors are recognized in:
- GitHub contributors graph
- Release notes for significant contributions
- Annual contributor acknowledgments

## 📞 Getting Help

- **General questions**: Create a GitHub discussion
- **Bug reports**: Create a GitHub issue
- **Security issues**: Email [ap@aporkolab.com](mailto:ap@aporkolab.com)
- **Direct contact**: [ap@aporkolab.com](mailto:ap@aporkolab.com)

## 📄 License

By contributing to BibleVerse, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BibleVerse! Your efforts help make this project better for everyone. 🙏

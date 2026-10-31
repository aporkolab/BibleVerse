#!/bin/bash

# ==========================================
# BibleVerse Setup Script
# ==========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log_error "$1 is required but not installed."
        return 1
    fi
    log_success "$1 is installed"
    return 0
}

# Banner
echo -e "${BLUE}"
cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    ____  _ _     _     __     __                             ║
║   |  _ \(_) |__ | | ___\ \   / /__ _ __ ___  ___             ║
║   | |_) | | '_ \| |/ _ \\ \ / / _ \ '__/ __|/ _ \            ║
║   |  _ <| | |_) | |  __/\ V /  __/ |  \__ \  __/            ║
║   |_| \_\_|_.__/|_|\___| \_/ \___|_|  |___/\___|            ║
║                                                              ║
║               Enterprise Setup Script                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

log_info "Starting BibleVerse development environment setup..."

# Check prerequisites
log_info "Checking prerequisites..."

MISSING_DEPS=0

if ! check_command "node"; then
    log_error "Please install Node.js 22.22.3+ (or 24 LTS) from https://nodejs.org/"
    MISSING_DEPS=1
fi

if ! check_command "npm"; then
    log_error "npm should come with Node.js"
    MISSING_DEPS=1
fi

if ! check_command "git"; then
    log_error "Please install Git from https://git-scm.com/"
    MISSING_DEPS=1
fi

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | sed 's/v//')
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1)
    if [ "$MAJOR_VERSION" -lt 22 ]; then
        log_error "Node.js version $NODE_VERSION detected. Please install Node.js 22.22.3+ (or 24 LTS) LTS"
        MISSING_DEPS=1
    else
        log_success "Node.js $NODE_VERSION is compatible"
    fi
fi

if [ $MISSING_DEPS -eq 1 ]; then
    log_error "Please install missing dependencies and run this script again."
    exit 1
fi

# Optional dependencies
log_info "Checking optional dependencies..."

if ! check_command "docker"; then
    log_warning "Docker not found. Install from https://docker.com for containerized development"
fi

if ! check_command "kubectl"; then
    log_warning "kubectl not found. Install for Kubernetes deployment capabilities"
fi

# Change to project root
cd "$PROJECT_ROOT"

# Install dependencies
log_info "Installing Node.js dependencies..."
npm install

# Install Angular CLI globally if not present
if ! command -v ng &> /dev/null; then
    log_info "Installing Angular CLI globally..."
    npm install -g @angular/cli@latest
    log_success "Angular CLI installed"
else
    log_success "Angular CLI is already installed ($(ng version --short))"
fi

# Setup Husky hooks
log_info "Setting up Git hooks with Husky..."
if [ -f "node_modules/.bin/husky" ]; then
    npx husky install
    chmod +x .husky/pre-commit
    log_success "Git hooks configured"
else
    log_warning "Husky not found in dependencies. Git hooks may not work."
fi

# Create environment files if they don't exist
log_info "Setting up environment files..."

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
    cat > .env.example << EOF
# BibleVerse Environment Variables
NODE_ENV=development
API_BASE_URL=https://szentiras.hu/api
ANALYTICS_ID=
SENTRY_DSN=
EOF
    log_success "Created .env.example"
fi

# Create local environment file
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    log_success "Created .env.local from template"
else
    log_info ".env.local already exists"
fi

# Setup VS Code workspace settings
log_info "Configuring VS Code settings..."
mkdir -p .vscode

if [ ! -f ".vscode/settings.json" ]; then
    cat > .vscode/settings.json << EOF
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "html"
  ],
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.angular": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.angular": true,
    "**/coverage": true
  }
}
EOF
    log_success "Created VS Code settings"
fi

if [ ! -f ".vscode/extensions.json" ]; then
    cat > .vscode/extensions.json << EOF
{
  "recommendations": [
    "angular.ng-template",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "johnpapa.angular2",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-kubernetes-tools.vscode-kubernetes-tools"
  ]
}
EOF
    log_success "Created VS Code extensions recommendations"
fi

# Run initial build
log_info "Running initial build..."
if npm run build:development; then
    log_success "Initial build completed successfully"
else
    log_error "Initial build failed. Check the output above."
    exit 1
fi

# Run tests to verify setup
log_info "Running tests to verify setup..."
if npm run test:ci; then
    log_success "Tests passed successfully"
else
    log_warning "Some tests failed. This might be expected for a new setup."
fi

# Setup Docker if available
if command -v docker &> /dev/null; then
    log_info "Setting up Docker development environment..."
    if docker-compose --version &> /dev/null; then
        log_info "Building Docker development image..."
        docker-compose build --no-cache
        log_success "Docker environment ready"
    else
        log_warning "docker-compose not found. Manual Docker setup required."
    fi
fi

# Create helpful aliases script
log_info "Creating development aliases..."
cat > scripts/dev-aliases.sh << 'EOF'
#!/bin/bash
# Development aliases for BibleVerse

# Project shortcuts
alias bv-start="npm run start:dev"
alias bv-build="npm run build:development"
alias bv-test="npm run test"
alias bv-lint="npm run lint"
alias bv-format="npm run format"

# Docker shortcuts
alias bv-docker-up="docker-compose --profile development up"
alias bv-docker-down="docker-compose down"
alias bv-docker-logs="docker-compose logs -f"

# Git shortcuts
alias bv-status="git status"
alias bv-log="git log --oneline -10"
alias bv-branches="git branch -a"

echo "BibleVerse development aliases loaded!"
echo "Available commands:"
echo "  bv-start     - Start development server"
echo "  bv-build     - Build for development"
echo "  bv-test      - Run tests"
echo "  bv-lint      - Run linter"
echo "  bv-format    - Format code"
echo "  bv-docker-*  - Docker commands"
echo "  bv-git-*     - Git shortcuts"
EOF

chmod +x scripts/dev-aliases.sh
log_success "Created development aliases (source scripts/dev-aliases.sh to use)"

# Final instructions
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗"
echo -e "║                                                              ║"
echo -e "║                    🎉 SETUP COMPLETE! 🎉                    ║"
echo -e "║                                                              ║"
echo -e "╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
log_success "BibleVerse development environment is ready!"
echo ""
log_info "Next steps:"
echo "  1. Start development server: ${YELLOW}npm run start:dev${NC}"
echo "  2. Open browser to: ${YELLOW}http://localhost:4200${NC}"
echo "  3. Load dev aliases: ${YELLOW}source scripts/dev-aliases.sh${NC}"
echo "  4. Read the docs: ${YELLOW}docs/CONTRIBUTING.md${NC}"
echo ""
log_info "Useful commands:"
echo "  • ${YELLOW}npm run start:dev${NC}     - Start development server"
echo "  • ${YELLOW}npm run build:prod${NC}    - Build for production"
echo "  • ${YELLOW}npm run test${NC}          - Run tests"
echo "  • ${YELLOW}npm run lint${NC}          - Check code quality"
echo "  • ${YELLOW}npm run format${NC}        - Format code"
echo ""
log_info "Docker development:"
echo "  • ${YELLOW}npm run docker:compose:dev${NC} - Start containerized development"
echo "  • ${YELLOW}docker-compose down${NC}        - Stop containers"
echo ""
log_info "For more information, see:"
echo "  • ${YELLOW}README.md${NC}              - Project overview"
echo "  • ${YELLOW}docs/CONTRIBUTING.md${NC}   - Development guide"
echo "  • ${YELLOW}docs/DEPLOYMENT.md${NC}     - Deployment guide"
echo ""

# Check if we're in a git repository and suggest next steps
if git rev-parse --git-dir > /dev/null 2>&1; then
    if [ -z "$(git remote get-url origin 2>/dev/null)" ]; then
        log_info "Don't forget to set up your Git remote:"
        echo "  ${YELLOW}git remote add origin <your-repo-url>${NC}"
    fi
else
    log_warning "Not in a Git repository. Consider initializing one:"
    echo "  ${YELLOW}git init${NC}"
    echo "  ${YELLOW}git remote add origin <your-repo-url>${NC}"
fi

log_success "Happy coding! 🚀"

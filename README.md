# 📖 BibleVerse - Enterprise Bible Verse Lookup Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, enterprise-grade Angular application for Bible verse lookup and navigation, utilizing the Szentiras.hu API.

## 🌟 Features

- ✨ **Random verse display** - Discover new verses daily
- 🔍 **Quick verse lookup** - Find specific verses instantly  
- 🔎 **Keyword search** - Search by content and context
- 🌍 **Multi-environment support** - Development, staging, production
- 🔒 **Enterprise security** - CSP, HTTPS, security headers
- 📱 **Responsive design** - Works on all devices
- 🚀 **PWA ready** - Offline support and app-like experience
- 🔧 **CI/CD pipeline** - Automated testing, building, and deployment
- 📊 **Monitoring & analytics** - Comprehensive observability
- 🐳 **Containerized** - Docker and Kubernetes ready

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Angular 22 (standalone components, signals, zoneless change detection) with TypeScript 6.0
- **Styling**: Bootstrap 5.3+, SCSS
- **Testing**: Vitest (via `@angular/build:unit-test`, jsdom)
- **Build**: Angular CLI, esbuild application builder (`@angular/build`)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker, Kubernetes
- **Quality**: ESLint 10 (flat config, angular-eslint), Prettier, SonarQube
- **Security**: OWASP, Trivy, npm audit

### Project Structure
```
bibleverse/
├── .github/workflows/       # CI/CD pipelines
├── k8s/                    # Kubernetes manifests
│   ├── staging/           # Staging environment
│   └── production/        # Production environment
├── src/                   # Source code
│   ├── app/              # Angular application
│   ├── environments/     # Environment configurations
│   └── assets/           # Static assets
├── docs/                 # Documentation
├── docker-compose.yml    # Local development
├── Dockerfile           # Production container
├── Dockerfile.dev       # Development container
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 22.22.3+ or 24.15.0+ (required by Angular CLI 22; CI uses Node 24)
- npm 10+
- Git
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/APorkolab/BibleVerse.git
cd BibleVerse

# Run setup script (recommended)
./scripts/setup.sh

# OR manual setup
npm install
npm run start:dev
```

### Development

```bash
# Start development server
npm run start:dev          # http://localhost:4200

# Build for different environments
npm run build:development  # Development build
npm run build:staging      # Staging build
npm run build:production   # Production build

# Testing
npm run test              # Run unit tests (Vitest, watch mode)
npm run test:unit         # Run unit tests once
npm run test:coverage     # Run with coverage (coverage/bibleverse)

# Code quality
npm run lint              # Run ESLint
npm run format            # Run Prettier
npm run ci:quality        # Run all quality checks
```

### Docker Development

```bash
# Start development environment
docker-compose --profile development up

# Build production image
docker build -t bibleverse:latest .

# Run production container
docker run -p 8080:8080 bibleverse:latest
```

## 🔧 Configuration

### Environment Configuration

The app does not read runtime environment variables. Settings such as the API base URL
(`api.baseUrl`) live in `src/environments/environment*.ts` and are selected by the build
configuration (`development`, `staging`, `production`).

Docker build arguments:

```bash
VERSION=<image version label>
ENVIRONMENT=<development|staging|production>   # selects npm run build:<ENVIRONMENT>
```

### Build Configurations

- **Development**: Unoptimized, source maps, debugging enabled
- **Staging**: Optimized with source maps, analytics enabled
- **Production**: Fully optimized, analytics, PWA features

## 📱 Features

### Core Functionality
- 🎲 Random Bible verse generation
- 🔍 Quick verse lookup by reference
- 🔎 Full-text search with highlighting
- 📖 Multiple Bible translations (Káldi-Neovulgáta)
- 🌍 Responsive design for all devices

### Technical Features
- ⚡ Angular 22 with TypeScript
- 🎨 Bootstrap 5.3+ styling
- 🔒 Enterprise-grade security
- 📊 Comprehensive monitoring
- 🚀 PWA capabilities
- 🐳 Docker containerization
- ☸️ Kubernetes deployment

## 🧪 Testing

### Test Coverage
- Unit Tests (Vitest): services, reference builders and all components; 80%+ coverage required
- Security Tests: npm audit and Trivy image scanning in CI

### Running Tests

```bash
# Watch mode
npm run test

# Single run
npm run test:unit

# Coverage report
npm run test:coverage
open coverage/bibleverse/index.html
```

## 🚀 Deployment

### Environments

- **Development**: `http://localhost:4200`
- **Staging**: `https://staging-bibleverse.aporkolab.com`
- **Production**: `https://bibleverse.aporkolab.com`

### CI/CD Pipeline

Automated deployment via GitHub Actions:
1. Code quality checks (ESLint, Prettier)
2. Security scanning (Trivy, npm audit)
3. Testing (unit tests with coverage)
4. Docker build and push
5. Kubernetes deployment
6. Health checks and notifications

### Manual Deployment

```bash
# Build and deploy to staging
npm run build:staging
kubectl apply -f k8s/staging/

# Build and deploy to production
npm run build:production
kubectl apply -f k8s/production/
```

## 📊 Monitoring

### Application Metrics
- Performance monitoring with Core Web Vitals
- Error tracking and alerting
- User analytics and engagement
- API response time monitoring

### Infrastructure Monitoring
- Kubernetes cluster health
- Container resource usage
- Network performance
- Security event logging

### Dashboards
- **Grafana**: Application and infrastructure metrics
- **SonarQube**: Code quality and security
- **GitHub Actions**: CI/CD pipeline status

## 🔒 Security

### Security Features
- OWASP Top 10 compliance
- Content Security Policy (CSP)
- Security headers implementation
- Container vulnerability scanning
- Dependency security auditing

### Security Testing
- Static Application Security Testing (SAST)
- Dependency vulnerability scanning
- Container image scanning
- Security code review process

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Run quality checks
6. Submit a pull request

### Code Standards
- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Maintain 80%+ test coverage
- Use conventional commit messages
- Pass all quality gates

## 📋 Roadmap

### Version 1.1 (Q2 2024)
- [ ] Multi-language support (English, German)
- [ ] Advanced search filters
- [ ] User favorites and bookmarks
- [ ] Offline reading capability

### Version 1.2 (Q3 2024)
- [ ] Dark mode theme
- [ ] Reading plans and devotionals
- [ ] Social sharing features
- [ ] Enhanced mobile experience

### Version 2.0 (Q4 2024)
- [ ] Multiple Bible translations
- [ ] Commentary integration
- [ ] Study tools and notes
- [ ] Audio Bible support

## 📚 Documentation

- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [CI/CD Documentation](docs/CICD.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)

## 📞 Support

### Getting Help
- **Documentation**: Check the [docs/](./docs/) directory
- **Issues**: [GitHub Issues](https://github.com/APorkolab/BibleVerse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/APorkolab/BibleVerse/discussions)
- **Email**: [ap@aporkolab.com](mailto:ap@aporkolab.com)

### Commercial Support
For enterprise support, custom development, or consulting services, contact:
- **Email**: [ap@aporkolab.com](mailto:ap@aporkolab.com)
- **Website**: [https://aporkolab.com](https://aporkolab.com)

## 🙏 Acknowledgments

### API Provider
Special thanks to the [Szentírás.hu](https://szentiras.hu/) team for providing the Bible API:
- **Fodor Bertalan** ([@briff](https://github.com/briff))
- **Elek László** ([@borazslo](https://github.com/borazslo))
- **Molnár Márton** ([@molnarm](https://github.com/molnarm))

### Data Sources
- Bible verse counts: [Ben Kuhl](https://github.com/bkuhl/bible-verse-counts-per-chapter)
- Template: [TemplateMo Astro Motion](https://templatemo.com/tm-560-astro-motion)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=APorkolab/BibleVerse&type=Date)](https://star-history.com/#APorkolab/BibleVerse&Date)

---

**Made with ❤️ by [Dr. Porkoláb Ádám](https://aporkolab.com)**

*"For the word of God is alive and active. Sharper than any double-edged sword..." - Hebrews 4:12*

## **2. Az alkalmazás telepítése**

1. Ha nincs telepítve a Git verziókezelő szoftver, akkor a https://git-scm.com weboldalról töltsük le és telepítsük fel a főoldalon megtalálható változatok közül az operációs rendszerünknek megfelelőt.

2. Ha nincs telepítve a NodeJS futtatókörnyezet, akkor a https://nodejs.org/en/ weboldalról töltsük le és telepítsük fel a főoldalon található, "LTS" megjelölésű változatot.

3. Ha nincs telepítve az Angular keretrendszer a rendszeren, akkor azt a PowerShell-ben kiadott `npm i -g @angular/cli` paranccsal ezt tegyük meg.

4. Le kell klónozni az adott GitHub repository tartalmát. Tehát a PowerShell-ben a következő parancsot kell kiadni:

   `git clone https://github.com/APorkolab/Bibleverse.git`

5. Telepíteni kell az alkalmazás függőségeit:

   - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.\*

6.1. Manuális telepítés esetén:

- A terminálban ki kell adni az `ng build` parancsot.

- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

VAGY

6.2. Automatikus telepítés esetén:

- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.
- Fontos, hogy csak az egyik módszer szerint kell telepíteni.

## **3. Az alkalmazás indítása**

- Mind a backend, mind a frontend az `npm start` paranccsal indítható.
- A játék aktuális verziója a [https://bibleverse.aporkolab.com/] címen elérhető.

## **4. Kapcsolattartási információ**

##### Webfejlesztés, design: Dr. Porkoláb Ádám

- **A weboldallal és általános kérdésekkel, észrevételekkel kapcsolatban:**
  Dr. Porkoláb Ádám (ap@aporkolab.com)

## **5. Felhasznált technológiák**

- Legelőször is hálásan köszönöm a [Szentírás.hu](https://szentiras.hu/) fejlesztőinek, [Fodor Bertalannak](https://github.com/briff), [Elek Lászlónak](https://github.com/borazslo) és [Molnár Mártonnak](https://github.com/molnarm) a backend API-t! Isten áldja meg és segítse a készítőket további munkájuk során!

- Köszönöm a Biblia könyveinek fejezet- és versszámait tartalmazó JSON file-t Ben Kuhlnak ([https://github.com/bkuhl/bible-verse-counts-per-chapter](https://github.com/bkuhl/bible-verse-counts-per-chapter)). Ez alapvető fontosságú volt, hogy véletlenszerű igehelyeket tudjak generálni. A hiányzó könyvek (Tób, Judit, Bölcs, Sír, Bár, 1Makk és 2Makk) adatait a [Szentírás.hu](https://szentiras.hu/) alapján pótoltam.
- Köszönöm a TemplateMo-nak az ingyenes, Astro Motion sablont, amit testre szabhattam. ([https://templatemo.com/tm-560-astro-motion](https://templatemo.com/tm-560-astro-motion))

## **6. Tervek a következő verzióhoz:**

- Választható fordítás,
- Többnyelvűsítés (Biblaszöveg + kezelőfelület).
- Reszponzivitás fejlesztése.

---

# Documentation -- BibleVerse v.1.0.0

## **1. Purpose of the application**

This application is called **BibleVerse v.1.0.0** , which allows quick search and navigation in the Bible text using the Szentiras.hu backend API.

The front-end of the application was actually created by Dr. Ádám Porkoláb (https://www.aporkolab.com). Other software by the author and the source code of this application can be downloaded from GitHub ([https://github.com/APorkolab](https://github.com/APorkolab)).

This application is capable of the following:

- display random verse(s),
- quick selection and retrieval of known verse,
- keyword-based search.

By default, the application works from the Káldi-Neovulgáta translation. In later versions of the program, it is possible to choose an another translation.

### **1.1. Version history**

#### _v1.0_

- Frontend based on Angular 15.
- It generates HTTP requests compatible with Szentiras.hu API version 2023.01.08,
- The complete designed functionality is ready.

## **2. Installing the application**

1. If you don't have the Git version control software installed, download and install the version for your operating system from https://git-scm.com.

2. If you do not have the NodeJS runtime environment installed, download and install the version marked "LTS" from https://nodejs.org/en/.

3. If you do not have the Angular framework installed on your system, do so by issuing the `npm i -g @angular/cli` command in PowerShell.

4. clone the contents of the GitHub repository. So in PowerShell, issue the following command:

   `git clone https://github.com/APorkolab/Bibleverse.git`

5. Install the application dependencies:

   - In the terminal, go to the /frontend folder and run `npm i`.

6.1. For manual installation:

- In the terminal, issue the `ng build` command.

- The contents of the /frontend/dist/frontend folder must be copied to the /backend/public folder.

OR

6.2. For automatic installation:

- In the terminal, go to the /backend folder and run `npm run build`.
- It is important to install using only one of the methods.

## **3. Start the application**

- Both the backend and the frontend can be started with `npm start`.

## **4. Contact information**

##### Web development, design by Dr. Ádám Porkoláb

- **About the website and general questions and comments:**
  Dr. Ádám Porkoláb (ap@aporkolab.com)

## **5. Technologies used**

- First of all, I would like to thank the developers of [Szentírás.hu](https://szentiras.hu/), [Bertalan Fodor](https://github.com/briff), [László Elek](https://github.com/borazslo) and [Márton Molnár](https://github.com/molnarm) for the backend API! God bless and help the developers in their future work!

- Thanks to Ben Kuhl ([https://github.com/bkuhl/bible-verse-counts-per-chapter](https://github.com/bkuhl/bible-verse-counts-per-chapter)) for the JSON file containing the chapter and verse numbers of the books of the Bible. This was essential for generating random verses. I filled in the missing books (Tob, Judith, Wise, Sirius, Bar, 1 Macc and 2 Macc) using data from [Szentírás.hu](https://szentiras.hu/).
- Thanks to TemplateMo for the free Astro Motion template that I could customize ([https://templatemo.com/tm-560-astro-motion](https://templatemo.com/tm-560-astro-motion))

## **6. Plans for the next version:**

- Optional translation,
- Multilingualization (Bible text + interface).
- Improving responsiveness.

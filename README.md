# Introduction

This is a backend for video sharing.

Happy coding!

## Backend Setup

### Local with docker

Copy Dockerfile, docker-compose.yml and env

```bash
cp Dockerfile.dev Dockerfile
cp docker-compose.dev.yml docker-compose.yml
cp .env.local .env
```

Build docker

```
docker-compose build
```

Install dependency

```
docker-compose run backend yarn
```

Run local server

```
docker-compose up
```
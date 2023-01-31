# elcap-app

## Dependencies

- Homebrew v3.6.2 (macOS only)
- Node v16.17.0
- NPM v8.15.0
- Yarn v1.22.19
- Dotenv CLI v6.0.0
- TypeScript v4.8.3

### macOS Monterey v12.4

#### Homebrew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Node/NPM

```
brew install node@16
```

#### Yarn

```
npm install --global yarn
```

#### Dotenv CLI

```
npm install --global dotenv-cli
```

#### TypeScript

```
npm install --global typescript
```

### Ubuntu v20.04

#### Node/NPM

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get -y install nodejs
```

#### Yarn

```
npm install --global yarn
```

#### Dotenv CLI

```
npm install --global dotenv-cli
```

#### TypeScript

```
npm install --global typescript
```

## Getting Started

### Environment Variables

```
cp sample.env .env
```

Get these secrets from another developer

- `REACT_APP_GOOGLE_CLIENT_ID`

### Project Setup

```
yarn install
```

### Yarn Commands

```
yarn start
yarn test
# `yarn test` requires `yarn start` to be running
```

## Building for Production

In production, this repo will be pulled in by the [`elcap-docker`](https://github.com/joshuabradley012/elcap-docker) repository and the `Dockerfile` will be run.

To test the production output, run:

```
yarn build
```

You would need to have NGINX hosting these files to view them correctly. You could also use Vercel's [serve](https://www.npmjs.com/package/serve) package. It is recommended to use the Docker container.

## Docker

### Build Docker Images
```
docker build --platform linux/amd64 -f Dockerfile.prod -t {name}:{tag} .
```

### Run the docker image
```
docker run -p 3000:3000 --name prodtest app:prod-test
```

We map the localhost port 8080 to the container port 3000

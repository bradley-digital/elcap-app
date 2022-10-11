# elcap-app

## Dependencies

- Docker v20.10.17

### macOS

#### Docker

Install the desktop application: https://docs.docker.com/get-started/#download-and-install-docker

### Ubuntu v20.04

#### Update and upgrade apt-get

```
sudo apt-get -y update
sudo apt-get -y upgrade
```

#### Docker

```
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Getting Started

#### Environment Variables

```
cp sample.env .env
```

#### Node Modules

```
yarn install
yarn precommit
```

#### Formatter

Auto linting is enabled on commit as a Git hook using `husky`, `pretty-quick`, and `eslint`.

To change what runs on commit update the `pre-commit` file in the `/.husky` directory. To change what files are ignored, update the `react/.eslintignore` file.

#### Docker
```
docker compose up
```

If you're changing the docker config, you might need to trigger a fresh build for changes to take affect:

```
docker compose rm -f
docker volume prune
docker compose up --build
```

You can also use yarn commands:

```
yarn start
yarn kill
```

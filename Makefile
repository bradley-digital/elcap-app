.PHONY: confirm
_WARN := "\033[33m[%s]\033[0m %s\n"  # Yellow text for "printf"
_TITLE := "\033[32m[%s]\033[0m %s\n" # Green text for "printf"
_ERROR := "\033[31m[%s]\033[0m %s\n" # Red text for "printf"

CURRENT_BRANCH = $(shell git branch --show-current) 
COMMIT = $(shell git rev-parse --short=12 HEAD)

# =====================
# PUSHING & DEPLOY

DO_CONTAINER_REGISTRY = registry.digitalocean.com/elcap-cr/app

build-image:
	docker build --platform linux/amd64 --build-arg="ENV=$(ENV)" -f Dockerfile.k8s -t app:k8s.$(ENV) .

tag-image:
	docker tag app:k8s.$(ENV) $(DO_CONTAINER_REGISTRY):$(ENV)-latest
	docker tag app:k8s.$(ENV) $(DO_CONTAINER_REGISTRY):$(ENV)-$(COMMIT)

push-image:
	docker push $(DO_CONTAINER_REGISTRY):$(ENV)-latest
	docker push $(DO_CONTAINER_REGISTRY):$(ENV)-$(COMMIT)

# Build, Tag, and Push the docker image. Will check if on main if prod is specified
btp:
	@if [ ${ENV} = "prod" ]; then \
		make main-required; \
	fi
	make build-image ENV=$(ENV)
	make tag-image ENV=$(ENV)
	make push-image ENV=$(ENV)

# Enforce the current branch is main
main-required:
	make branch-check CHECK_BRANCH="main"

# Check that the current branch is the provided CHECK_BRANCH
branch-check:
	@if [ "$(CURRENT_BRANCH)" != $(CHECK_BRANCH) ]; then		\
		echo "$(tput setaf 3)WARNING: Current git branch is not $(CHECK_BRANCH): $(CURRENT_BRANCH)"; 	\
		exit 1;											\
	fi
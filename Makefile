build-image:
	docker build --platform linux/amd64 -f Dockerfile.k8s.$(ENV) -t app:k8s.$(ENV) .

tag-image:
	docker tag app:k8s.$(ENV) registry.digitalocean.com/elcap-cr/app:$(ENV)-latest

push-image:
	docker push registry.digitalocean.com/elcap-cr/app:$(ENV)-latest

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
	$(eval CURRENT_BRANCH := $(shell git branch --show-current))
	@if [ "$(CURRENT_BRANCH)" != $(CHECK_BRANCH) ]; then		\
		echo "$(tput setaf 3)WARNING: Current git branch is not $(CHECK_BRANCH): $(CURRENT_BRANCH)"; 	\
		exit 1;											\
	fi
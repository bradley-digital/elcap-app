build-image:
	echo 'noah'
	docker build --platform linux/amd64 -f Dockerfile.k8s.$(ENV) -t app:k8s.$(ENV) .

tag-image:
	docker tag app:k8s.$(ENV) registry.digitalocean.com/elcap-cr/app:$(ENV)-latest

push-image:
	docker push registry.digitalocean.com/elcap-cr/app:$(ENV)-latest

# Build, Tag, and Push the docker image
btp:
	make build-image ENV=$(ENV)
	make tag-image ENV=$(ENV)
	make push-image ENV=$(ENV)

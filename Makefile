# -------------------------------------------
# Utilities
# -------------------------------------------
start-api:
	docker build -t paulgain/simple-api:latest .
	docker-compose up

stop-api:
	docker-compose stop

clean: 
	docker system prune -f

# -------------------------------------------
# Pipeline
# -------------------------------------------
lint:
	@echo "Running lint"
	docker-compose build api
	docker-compose run --no-deps --rm api bash -c 'yarn lint'

unit-tests:
	@echo "Running unit tests"
	docker-compose build api
ifdef CI
	docker-compose run --no-deps --rm api bash -c 'yarn test:unit:ci'
else
	docker-compose run --no-deps --rm api bash -c 'yarn test:unit'
endif

coverage:
	@echo "Running coverage"
	docker-compose build api
	docker-compose run --no-deps --rm api bash -c 'yarn test:coverage'

# -------------------------------------------
# Dockerhub
# -------------------------------------------
dockerhub-push:
	docker build -t paulgain/simple-api:latest .
	docker push paulgain/simple-api

dockerhub-pull:
	docker pull paulgain/simple-api

APP=base-react-app
# Version of the app
VERSION=v0.0.2
# internal port for the app
IPORT=8080
# external port for the app
PORT=3002
REPO_NAME=${APP}
TAG=${VERSION}
# dev, cert, prod (eg => MODE=dev ).
MODE=dev

install:
	npm install -g bun & bun install

run:
	bun run dev --port 5174 --mode ${MODE}

# create .env.dev
build:
	bun run build --mode ${MODE}

#create .env.cert
buildc:
	bun run build --mode cert

#create .env.prod
buildp:
	bun run build --mode prod

dbuild:
	docker build -t ${REPO_NAME}:${TAG} .

drund:
	docker run --restart always --name=${REPO_NAME} -dp ${PORT}:${IPORT} ${REPO_NAME}:${TAG}
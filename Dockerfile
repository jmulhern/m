FROM node:18-alpine AS js-builder

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM golang:1.23-bookworm AS bin-builder

WORKDIR /src

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o bin/m

FROM gcr.io/distroless/static-debian11:nonroot

WORKDIR /m

COPY --from=js-builder /src/dist dist
COPY --from=bin-builder /src/bin/m m

# desertcatecookies
COPY desertcatcookies/public desertcatcookies/public
# greasyshadows
COPY greasyshadows/public greasyshadows/public
# johnmulhern
COPY johnmulhern/public johnmulhern/public
COPY johnmulhern/private johnmulhern/private
# sportsball
COPY sportsball/public sportsball/public
# whatever
COPY whatever/public whatever/public

CMD ["/m/m"]
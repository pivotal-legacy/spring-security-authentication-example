all: tests

createdb:
	@createdb -e react-spring-session-dev

dropdb:
	@dropdb -e react-spring-session-dev

refreshdb: dropdb createdb

tests:
	@./gradlew clean test build

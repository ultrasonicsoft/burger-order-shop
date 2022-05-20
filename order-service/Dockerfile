FROM maven:3-openjdk-11 AS builder
COPY . /builder
WORKDIR /builder
RUN mvn clean package


FROM openjdk:11-jre-slim-buster AS worker
COPY --from=builder /builder/target/*.jar service.jar
ENTRYPOINT ["java", "-jar", "service.jar"]
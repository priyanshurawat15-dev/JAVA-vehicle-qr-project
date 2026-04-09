FROM eclipse-temurin:17

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y maven

RUN mvn clean install

CMD ["java", "-jar", "target/bolt-backend-0.0.1-SNAPSHOT.jar"]
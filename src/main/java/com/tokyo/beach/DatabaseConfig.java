package com.tokyo.beach;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
public class DatabaseConfig {
    private static Pattern DATABASE_URL_PATTERN = Pattern.compile("jdbc:postgresql://([^:]*):([^@]*)@(.*)/(.*)");
    private static String DATABASE_URL_ENV_VARNAME = "REACT_SPRING_SESSION_DATABASE_URL";

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv(DATABASE_URL_ENV_VARNAME);

        if (databaseUrl == null) {
            throw new RuntimeException(
                "A " + DATABASE_URL_ENV_VARNAME + " is required in the environment to start the application."
            );
        }

        Matcher matcher = DATABASE_URL_PATTERN.matcher(databaseUrl);

        if (matcher.matches()) {
            String databaseUser = matcher.group(1);
            String databasePassword = matcher.group(2);
            String databaseHostname = matcher.group(3);
            String databaseName = matcher.group(4);

            HikariDataSource dataSource = new HikariDataSource();

            dataSource.setDataSourceClassName("org.postgresql.ds.PGSimpleDataSource");
            dataSource.setJdbcUrl(databaseUrl);
            dataSource.setUsername(databaseUser);
            dataSource.setPassword(databasePassword);

            dataSource.addDataSourceProperty("serverName", databaseHostname);
            dataSource.addDataSourceProperty("databaseName", databaseName);

            return dataSource;
        }

        throw new RuntimeException(
            "A valid postgres " + DATABASE_URL_ENV_VARNAME + " environment variable must be present"
        );
    }
}

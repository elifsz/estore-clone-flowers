# run database 
docker run --name=e-store-flowers-db -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest

# run backend api
docker build -t 17050111056/e-store-flowers-api .
docker run -p 8080:80 17050111056/e-store-flowers-api

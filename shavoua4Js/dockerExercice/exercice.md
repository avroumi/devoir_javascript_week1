docker_compose_exercise.md
Page

13
/
1
100 %

# Docker Compose — תרגילים

## תרגיל 1 — Compose בסיסי

כתוב `docker-compose.yml` שמריץ nginx:alpine על port 8080:

```yaml
version: "3.8"
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
```

1. הרץ: `docker compose up -d`
2. גלוש ל-localhost:8080
3. עצור: `docker compose down`

---

## תרגיל 2 — שני services

הוסף service שני — Node.js שמדפיס "Hello":

```yaml
services:
  web:
    image: nginx:alpine
    ports: ["8080:80"]

  app:
    image: node:20-alpine
    working_dir: /app
    volumes: ["./:/app"]
    command: node -e "setInterval(()=>console.log('app running'),2000)"
```

1. `docker compose up`
2. `docker compose logs -f app` — ראה logs
3. `docker compose exec app sh` — כנס ל-app

---

## תרגיל 3 — Node + Postgres

כתוב compose מלא עם app + db:

- `app`: node:20-alpine, bind mount קוד, port 3000, depends_on: db
- `db`: postgres:16, password=secret, volume לנתונים
- `DB_HOST` ב-app = שם ה-db service

---

## תרגיל 4 — env_file

1. צור קובץ `.env` עם `DB_PASSWORD=mysecret`
2. עדכן compose.yml להשתמש ב-`env_file: .env`
3. ב-db — `POSTGRES_PASSWORD: ${DB_PASSWORD}`
4. ודא שהכל עובד: `docker compose up -d`
5. הוסף `.env` ל-`.gitignore`

---

## תרגיל 5 — Logs + Exec

עם ה-stack מתרגיל 3:

1. `docker compose logs db` — ראה Postgres logs
2. `docker compose exec db psql -U postgres` — כנס ל-DB
3. ב-psql: `\l` לרשימת databases, `\q` לצאת
4. `docker compose down` — עצור הכל
   Affichage de docker_compose_exercise.md

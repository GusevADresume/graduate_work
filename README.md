##### Для запуска проекта необходимо выполнить следующие действия
>
>1. Создать отдельную директорию
>2. клонировать репозиторий ``` git clone https://github.com/AntonGusev111/Graduate-work ```
>3. Создать виртуальное окружение ``` python -m venv venv```
>4. Запустить виртуальное окружение ``` venv\Scripts\activate ```
>5. Создать бд postgres ```create database filehost_db;```
>6. Создать пользователя БД ```create user host_admin with password '123456789';```
>7. Связать пользователя и БД ```alter database filehost_db owner to host_admin;```
>8. Зайти в папку host/frontend и провести установку всех пакетов ```npm install;```
>9. Находясь в той же папке собрать проект ```npm run build;```
>10. Перейти в папку host и установить зависимости ```pip install -r requirements.txt```
>11. Провести миграции ```python manage.py migrate```
>12. Создать супер пользователя ```python manage.py createsuperuser```
>13. Запустить приложение ```python manage.py runserver```

Для назначения первого зарегистрированного пользователя администратором, необходимо войти в ```http://127.0.0.1:8000/admin``` как супер пользователь и назначить другого пользователя на роль администратора.

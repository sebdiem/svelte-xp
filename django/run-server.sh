cd /var/app

gunicorn zeus.wsgi -w 4

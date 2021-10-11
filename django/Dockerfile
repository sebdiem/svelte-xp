FROM python:3.9-slim

RUN pip install poetry==1.1.6 && \
  poetry config virtualenvs.create false

COPY ./pyproject.toml ./poetry.lock /
RUN poetry install --no-interaction --no-ansi -vvvv

ENV PYTHONPATH /root/scheduler:${PYTHONPATH}

EXPOSE 8001
VOLUME /var/app
WORKDIR /var/app
CMD python manage.py runserver 0.0.0.0:8001

release: python src/manage.py migrate
release: python src/manage.py createcachetable cache_table
web: gunicorn --chdir src cryptoprices.wsgi

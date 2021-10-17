# Crypto Prices

RESTful API to manage crypto prices

## For development environment

Move to the repository folder:

    cd crypto-prices/

Create the virtual environment:

    python3 -m venv ~/.crypto-prices

Activate the virtual env:

    . ~/.crypto-prices/bin/activate

Install the requirements (dev):

    pip install -r requirements/dev.txt

Run migrations:

    python src/manage.py migrate

Create Cache Table:

    python src/manage.py createcachetable cache_table 

Run check flake8 coding styles and run tests:

    flake8 . --extend-exclude=dist,build --show-source --statistics
    cd src/; python manage.py test

Create a superuser

    python src/manage.py createsuperuser 

Run the development server

    python src/manage.py runserver

Happy Hacking!

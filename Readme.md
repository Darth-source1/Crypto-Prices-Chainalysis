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

## Questionnaire answers

1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

No, I haven’t taken any sub-optimal choices while development. The app pulls data every 20 seconds from the API.

2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

Yes, I have used Django as a backend framework it isn’t required for this simple app. The whole app can easily be designed in native react without any backend requirement.

3. If you have to scale your solution to 100 users/second traffic, what changes would you make, if any?

As the backend is coded in Django, we can cache the content that we give to the users for pull time (20 seconds) and then the content is going to be returned from the cache of the Redis database to as many users as we want. This avoids polling data from the API.

4.	What are some other enhancements you would have made, if you had more time to do this implementation

If I had more time to do this implementation, I would do a very interactive UI and show better comparison analytics. On top, I would add Kubernetes containerization to give the app the ability to scale to higher user demand and deploy it in the cloud. We can also integrate Stripe payments to quickly buy BTC/ETH. We are using a traditional HTTP API, which is stateless, which means it works on request/response and every connection is opened and closed after it is completed. cryptowat.ch also offers a websocket API, which helps us keep the connection open and never crashes in the application when it works in real-time (paid feature).

Link to live version: https://glacial-lake-43614.herokuapp.com/

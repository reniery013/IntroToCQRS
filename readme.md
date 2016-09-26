This is a quick exercise to demostrate CQRS

CQRS stands for Command Query Responsibility Segregation

In short CQRS is using a different model to insert and update information than the model you use to read information

Command = update
QUery = Reads


We have two models

https://github.com/reniery013/IntroToCQRS/blob/master/app.js#L23

In this case they have the same information but they could be different depending of our needs.


When creating a New record we use a Create Person Worker
https://github.com/reniery013/IntroToCQRS/blob/master/app.js#L42

We save a new record first in our Commands model
https://github.com/reniery013/IntroToCQRS/blob/master/app.js#L56

And later in our query model
https://github.com/reniery013/IntroToCQRS/blob/master/app.js#L65


In our frontend when we create a new method we use our worker which updates our 2 models
https://github.com/reniery013/IntroToCQRS/blob/master/frontend/app.js#L10

When reading the current records we use a different method which gets the information from our query model
https://github.com/reniery013/IntroToCQRS/blob/master/frontend/app.js#L10

Doing this we achieve the CQRS concept keeping our commands and queries separated.

In our case both models are in the same DB but we could use two different databases or even different servers.
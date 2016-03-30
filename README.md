# Polarbear Scaffold

A opinionated scaffold and possibly/eventually framework for a [12factor](http://12factor.net) node web application.

## Polarbear aims to <sup>[1](#12-factor-footnote)</sup>

* Orchestrate and manage multiple processes for your application using node-foreman
* Sale processes horizontally
* Load balance your applications using nginx(this should always be easily replaceable)
* Store configuration in environment variables
* Treat backing services as attached resources
* Manage infrastructure using ansible
* Build, release and run your application
* Maximize robustness with fast startup and graceful shutdown
* Keep development, staging, and production as similar as possible by managing infrastructure with ansible and providing virtualization for development using vagrant
* Send logs via stdout to a log-aggregator like logstash/logly(this should always be easily replaceable)
* Run and manage tasks using simple node scripts that follow a standard implementation
* Provide a way to build a api using express
* Provide a way to build a universal client application using React

<a name="12-factor-footnote">1</a>: The majority of these goals come from and are explained by the [12 factor app](http://12factor.net)

### Documentation is over [here](/docs/README.md)

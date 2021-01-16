# CovidWebApp-front-end

## Overview
The Web UI component for the CovidWebApp project for Software Technologies 2020/2021.

Link to the [Server component](https://github.com/Boyannik7/CovidWebApp-server)

Link to the [Machine Learning component](https://github.com/Boyannik7/CovidWebApp-ML)

## Deployment and operation

This application is deployed using [Docker](https://www.docker.com/) either locally or on a 
[PaaS](https://azure.microsoft.com/en-us/overview/what-is-paas/) environment, such as [Cloud Foundry](https://www.cloudfoundry.org/)
or a container orchestration system like [Kubernetes](https://kubernetes.io/).

- To use the web ui as a standalone application, do the following:

(Keep in mind, however, that the application needs a server to handle the HTTP requests)

---
### Prerequisite
To be able to build the docker image, you need Docker installed on your machine.

If you are using Windows or Mac, you can download [Docker Desktop](https://www.docker.com/products/docker-desktop).

If you are using a Linux distribution, use your appropriate package manager.

---

To build the docker image use:
```
docker build -t web-ui:latest https://github.com/Boyannik7/CovidWebApp-front-end.git#main
```
To start the container use:
```
docker run -p 80:80 web-ui:latest
```

The web ui will be available at http://`<localhost | public domain>`/

---

- To use the whole project, follow the instructions from the [Server component](https://github.com/Boyannik7/CovidWebApp-server)

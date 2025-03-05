# Question 1: Deploying a Multi-Container Application with Docker Compose and Kubernetes

## Scenario
You are tasked with deploying a multi-container application that includes a web server (Nginx) and a database (MySQL). Initially, this application will be deployed using Docker Compose and then migrated to Kubernetes.

---

## Objectives
1. Deploy a multi-container application using **Docker Compose**.
2. Migrate the application to **Kubernetes** with the following requirements:
   - Use `nginx:latest` image for the web server.
   - Create a Kubernetes Service of type **NodePort**.

---

## Steps to Accomplish
1. **Docker Compose Deployment**:
   - Define services for Nginx and MySQL in a `docker-compose.yml` file.
   - Ensure containers communicate seamlessly.

2. **Kubernetes Deployment**:
   - Create a Deployment for the Nginx and MySQL containers.
   - Configure a NodePort Service for Nginx to expose it externally.
---

## Expected Output
- Web server (Nginx) accessible via NodePort.
- Database (MySQL) running and connected to the Nginx web server.

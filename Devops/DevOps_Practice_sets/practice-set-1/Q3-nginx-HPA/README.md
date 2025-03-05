# Question 3: Auto-Scaling a Kubernetes Deployment Based on CPU Utilisation

## Scenario
You have a web application running on Kubernetes and want to enable automatic scaling based on CPU utilisation.

---

## Objectives
1. Deploy a web application using the `nginx:latest` image.
2. Set CPU resource requests to `100m` and limits to `500m`.
3. Configure a **Horizontal Pod Autoscaler (HPA)** with:
   - Minimum replicas: 1.
   - Maximum replicas: 10.
   - Target CPU utilisation: 50%.

---

## Steps to Accomplish
1. **Deploy the Application**:
   - Use a Deployment to create the Nginx application with the specified CPU resources.

2. **Configure HPA**:
   - Apply an HPA configuration that monitors CPU usage and scales pods accordingly.

---

## Expected Output
- The application automatically scales between 1 and 10 replicas based on CPU utilisation.

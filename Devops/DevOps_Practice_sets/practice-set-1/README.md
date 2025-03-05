# Practice Set 1: DevOps - Docker and Kubernetes

## Overview
This practice set is designed to reinforce key concepts in Docker and Kubernetes. It includes real-world scenarios to help you build hands-on experience in deploying, managing, and scaling containerized applications.

---

## Practice Questions

### **Question 1: Deploying a Multi-Container Application**
- **Scenario**: Deploy an application with a web server (Nginx) and a database (MySQL) using Docker Compose, then migrate it to Kubernetes.
- **Key Concepts**: Docker Compose, Kubernetes Deployment, NodePort Service.

### **Question 2: Configuring Persistent Storage**
- **Scenario**: Set up persistent storage for a MySQL database in Kubernetes to ensure data durability.
- **Key Concepts**: Persistent Volumes (PV), Persistent Volume Claims (PVC), Stateful Applications.

### **Question 3: Auto-Scaling Based on CPU Utilisation**
- **Scenario**: Configure Horizontal Pod Autoscaling (HPA) for a web application to scale based on CPU utilisation.
- **Key Concepts**: Resource Requests and Limits, Horizontal Pod Autoscaler (HPA).

### **Question 4: Using ConfigMaps in Deployments**
- **Scenario**: Create a ConfigMap to serve a custom HTML page through Nginx in Kubernetes.
- **Key Concepts**: ConfigMaps, Volume Mounts, Nginx Customization.

### **Question 5: Access Control with ServiceAccounts**
- **Scenario**: Use a ServiceAccount with specific roles to access a Kubernetes Secret in a deployment.
- **Key Concepts**: ServiceAccounts, Role-Based Access Control (RBAC), Kubernetes Secrets.

---

## Learning Objectives
By completing this practice set, you will:
1. Gain experience deploying containerized applications using Docker and Kubernetes.
2. Learn how to manage persistent storage in Kubernetes for stateful applications.
3. Understand how to implement auto-scaling for Kubernetes workloads.
4. Explore Kubernetes ConfigMaps for application customization.
5. Practice configuring access control using ServiceAccounts and RBAC in Kubernetes.

---

## Prerequisites
- Basic knowledge of Docker and Kubernetes.
- Access to a Kubernetes cluster (e.g., Minikube, Kubernetes on cloud providers, etc.).
- Installed tools: `kubectl`, `docker-compose`.

---

## How to Use This Practice Set
1. Navigate to the folder for each question.
2. Refer to the respective `README.md` file in each folder for detailed instructions and steps.
3. Implement the solutions and test them in your environment.
4. Verify the expected outputs and refine your solutions as needed.

---

## Feedback
If you have any feedback or questions regarding this practice set, feel free to raise an issue in the repository or contact your instructor.

Happy Learning!

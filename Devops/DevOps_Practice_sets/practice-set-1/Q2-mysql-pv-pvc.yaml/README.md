# Question 2: Configuring Persistent Storage in Kubernetes for a Stateful Application

## Scenario
You need to deploy a MySQL database on Kubernetes with persistent storage, ensuring that data persists even if the pod restarts.

---

## Objectives
1. Create a **Persistent Volume (PV)** with:
   - Storage capacity of 1Gi.
   - Access mode: `ReadWriteOnce`.

2. Create a **Persistent Volume Claim (PVC)** and use it in a Deployment for MySQL.

3. Use the image `mysql:5.7`.

---

## Steps to Accomplish
1. **Create a Persistent Volume (PV)**:
   - Define a YAML file to create the PV with the specified attributes.

2. **Create a Persistent Volume Claim (PVC)**:
   - Attach the PVC to ensure MySQL pod has access to persistent storage.

3. **Deploy MySQL**:
   - Create a Deployment for the MySQL database and mount the PVC.
---

## Expected Output
- MySQL database with persistent storage.
- Data retained even after pod restarts.

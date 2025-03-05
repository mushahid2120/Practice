# Question 5: Creating and Using a Service Account for Access Control

## Scenario
Create a ServiceAccount with specific roles and permissions, then use it in a Deployment to access a Kubernetes Secret.

---

## Objectives
1. Create a ServiceAccount named `my-service-account`.
2. Define a Role with permissions to:
   - `apiGroups: [""]`
   - `resources: ["secrets"]`
   - `verbs: ["get", "list"]`.

3. Bind the Role to the ServiceAccount using a RoleBinding.
4. Create a Kubernetes Secret with:
   - Key: `my-key`
   - Value: `Redhat`.

5. Deploy an application using the ServiceAccount to access the Secret.

---

## Steps to Accomplish
1. **Create the ServiceAccount**:
   - Define the ServiceAccount YAML configuration.

2. **Create a Role and RoleBinding**:
   - Assign appropriate permissions to the ServiceAccount.

3. **Create the Secret**:
   - Store sensitive data (`my-key: Redhat`).

4. **Deploy the Application**:
   - Use the image `busybox`.
   - Configure the container to display the secret using the command:
     `["sh", "-c", "cat /etc/secrets/my-key"]`.

---

## Expected Output
- Application successfully retrieves and displays the secret value from `/etc/secrets/my-key`.

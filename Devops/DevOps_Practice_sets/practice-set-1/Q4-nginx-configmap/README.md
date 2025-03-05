# Question 4: Create a ConfigMap and Use It in a Deployment

## Scenario
You need to create a ConfigMap containing a custom HTML page and update an Nginx Deployment to serve this custom page.

---

## Objectives
1. Create a ConfigMap that contains the content of the custom HTML file (`custom-page.html`).
2. Update the Nginx Deployment to serve the custom HTML page.
3. Use the image `nginx:latest`.

---

## Steps to Accomplish
1. **Create the ConfigMap**:
   - Define a ConfigMap containing the `custom-page.html` content.

2. **Update the Nginx Deployment**:
   - Mount the ConfigMap as a volume in the Nginx pod.
   - Ensure Nginx serves the custom HTML page.

---

## Expected Output
- Nginx serves the custom HTML page specified in the ConfigMap.

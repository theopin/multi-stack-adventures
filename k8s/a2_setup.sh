
printf "\n1a - Creating Kind cluster...\n"
kind create cluster --name kind-1 --config kind/cluster-config.yaml --image kindest/node:v1.24.0

printf "\n1b - Verifying cluster...\n"
kubectl cluster-info
kubectl get nodes


printf "\n2a - Deploying Node app...\n"
kubectl apply -f manifests/backend-deployment.yaml

printf "\n2b - Verifying deployment...\n"
kubectl rollout status deployment/backend


printf "\n4a - Setting Ingress controller...\n"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
sleep 10

printf "\n4b - Verifying Ingress controller...\n"
kubectl -n ingress-nginx get deploy


printf "\n5a - Setting up Service...\n"
kubectl apply -f manifests/backend-service.yaml

printf "\n5b - Verifying Service...\n"
kubectl get svc


printf "\n6a - Setting up Ingress...\n"
kubectl apply -f manifests/backend-ingress.yaml
sleep 10

printf "\n6b - Verifying Ingress...\n"
kubectl get ingress

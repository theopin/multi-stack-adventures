kind create cluster --name kind-1 --config kind/cluster-config.yaml --image kindest/node:v1.23.0
kubectl create -f manifests/backend-deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
kubectl apply -f manifests/backend-service.yaml
kubectl apply -f manifests/backend-ingress.yaml
kubectl create -f manifests/backend-deployment.yaml
kubectl label node kind-1-control-plane ingress-ready=true
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
kubectl apply -f manifests/backend-service.yaml
kubectl apply -f manifests/backend-ingress.yaml
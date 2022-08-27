kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl -nkube-system edit deploy/metrics-server
kubectl -nkube-system rollout restart deploy/metrics-server
kubectl apply -f manifests/backend-hpa.yaml
kubectl apply -f manifests/backend-zone-aware.yaml
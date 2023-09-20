printf "\n1a - Applying metric resources...\n"
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

printf "\n2 - Adding flag to enable TLS in metric server...\n"
# --kubelet-insecure-tls
kubectl -nkube-system edit deploy/metrics-server

printf "\n3 - Restarting metric server deployment...\n"
kubectl -nkube-system rollout restart deploy/metrics-server

printf "\n4a - Applying autoscaling...\n"
kubectl apply -f manifests/backend-hpa.yaml

printf "\n4b - Verify autoscaling...\n"
kubectl describe hpa


printf "\n5a - Apply zone-aware scheduling...\n"
kubectl apply -f manifests/backend-zone-aware.yaml

printf "\n5b - Verify zone-aware scheduling...\n"
kubectl get po -lapp=backend-zone-aware -owide --sort-by='.spec.nodeName'

while true
do
    wget -qO- http://localhost:80/app &> /dev/null
    echo donez
    sleep 0.0005
done
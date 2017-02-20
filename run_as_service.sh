#!/usr/bin/env bash
# docker stop dgm_nginx
# docker rm dgm_nginx
docker build -t dgm_nginx .
docker service create \
--replicas 1 \
--mount type=bind,source=/home/firegm/go/src/donategold.me/confs/nginx/static/dist/js,destination=/var/static/screen/js \
--mount type=bind,source=/home/firegm/go/src/donategold.me/confs/nginx/static/dist/html,destination=/etc/nginx/html/screen \
--mount type=volume,source=uploads,destination=/var/uploads/ \
--mount type=volume,source=static_core,destination=/var/static/core/ \
--network dgmnetwork \
-p 80:80 --name dgm_nginx dgm_nginx

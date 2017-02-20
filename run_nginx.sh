#!/usr/bin/env bash
docker stop dgm_nginx
docker rm dgm_nginx
docker build -t dgm_nginx .
docker run -it --link dgm_backend:backend \
--link dgm_front:frontend \
-v /home/firegm/go/src/donategold.me/confs/nginx/static/dist/js:/var/static/screen/js:ro \
-v /home/firegm/go/src/donategold.me/confs/nginx/static/dist/html:/etc/nginx/html/screen:ro \
-v uploads:/var/uploads/ \
-v static_core:/var/static/core/ \
-p 80:80 --name dgm_nginx dgm_nginx

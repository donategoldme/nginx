#!/usr/bin/env bash
docker stop dgm_nginx
docker rm dgm_nginx
docker build -t dgm_nginx .
docker run -it --link dgm_backend:backend -v /home/firegm/go/src/donategold.me/confs/nginx/static/dist/js:/var/screen/static/js:ro \
-v /home/firegm/go/src/donategold.me/confs/nginx/static/dist/html:/etc/nginx/html/screen:ro -v uploads:/var/uploads/ -p 3030:80 --name dgm_nginx dgm_nginx

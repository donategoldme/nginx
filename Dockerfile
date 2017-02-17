FROM nginx:1.11.9
RUN rm -v /etc/nginx/nginx.conf
ADD ./nginx.conf /etc/nginx/
#ADD sites-enabled/ /etc/nginx/sites-enabled
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf

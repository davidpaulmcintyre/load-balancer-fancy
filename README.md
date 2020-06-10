This repo uses https://github.com/davidpaulmcintyre/load-balancer as its starting point. It adds compression and ssl. These features are added in the nginx configuration. A prerequisite for these features is a signed certificate; my certificate is self-signed and is not accepted by Chrome. Safari doesn't like it either, but Safari eventually lets me view the page after clicking thru the warnings and entering my password. 

```
http {
    upstream loadbalancer {
        # ip_hash;
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
    }
server {
    listen 80;
    listen [::]:80;
    server_name loadbalancer.com;
    return 301 https://$server_name$request_uri;
}

server {
    # SSL configuration
    listen 443 ssl;
        ssl on;
        gzip on;
        location / {
                proxy_pass http://loadbalancer;
                proxy_buffering off;
                proxy_set_header X-Real-IP $remote_addr;
        }
    listen [::]:443 ssl;
    server_name loadbalancer.com;
    ssl_certificate           /etc/ssl/nginx/nginx-selfsigned.crt;
    ssl_certificate_key       /etc/ssl/nginx/nginx-selfsigned.key;
    ssl_session_cache         shared:SSL:1m;
    ssl_prefer_server_ciphers on;
}

}
```
To demonstrate the ssl, browse to http://localhost and watch the browser be redirected to https://localhost. If you navigate to Safari devtools Network tab, then select the request and view the Sizes tab, you can see that the content of the response was originally 9.8kb but gzipped to 0.3kb, a huge savings.
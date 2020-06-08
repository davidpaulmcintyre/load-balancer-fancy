This is a POC demonstrating how to use nginx as a load balancer for multiple Node servers.

To start, run:

```
npm install
npm run start
```
which should start node servers running on ports 3000 and 3001.  

If successful, you should be able to open a browser and navigate to both http://localhost:3000 and http://localhost:3001. The requested page should display the server's port number.

The local nginx server should have the following configuration mapping port 80 to ports 3000 and 3001:

```
http {
    upstream loadbalancer {
        # ip_hash;
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
    }
    server {
        listen       80;
        server_name  localhost;

        location / {
                proxy_pass http://loadbalancer;
                proxy_buffering off;
                proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

By default, nginx will use a round-robin pattern of balancing, so that repeated refreshes of the browser window should alternate betwen being handled by ports 3000 and 3001.

To enable sticky sessions, un-comment the 'ip_hash' line, but this will result in all local requests being handled by the node server at 3000.
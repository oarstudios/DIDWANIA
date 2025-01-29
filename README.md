FRONTEND AND BACKEND: npm start



<!-- # Redirect HTTP to HTTPS
server {
    listen 80;
    server_name didwaniacreations.in www.didwaniacreations.in;

    if ($host = www.didwaniacreations.in) {
        return 301 https://$host$request_uri;
    }
    if ($host = didwaniacreations.in) {
        return 301 https://$host$request_uri;
    }

    return 404; # managed by Certbot
}

# Serve website & backend on HTTPS
server {
    server_name didwaniacreations.in www.didwaniacreations.in;

    root /var/www/html/didwania;
    index index.html;

    # Serve frontend files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy backend requests to Node.js
    location ~ ^/(users|products|bills|order|uploads) {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    error_page 404 /index.html;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/didwaniacreations.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/didwaniacreations.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot;
}
 -->
# DevTinder

- Create a vite + react application.
- install Tailwind CSS
- install Daisy UI
- Create a Navbar.jsx component file.
- install react-router
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create Outlet in Body component > Navbar , {Outlet}
- Create Footer in Body component > Navbar , {Outlet} , Footer
- Install axios
- Cors - install cors in backend => add middleware to with configurations : origin and credential
- whenever you are make an API call so pass axios => {withCredentials:true}
- npm install @reduxjs/toolkit react-redux
- create a configureStore => Provider => createSlice => add reducer in store
- add to user info in store => use useDispatch and addUser reducer in Login component
- subscribe the store in Navbar Component using useSelector
- code mentain, you should not be access other routes without login.
- if token is not present , redirect user to login page.
- create Logout Feature
- create feedSlice and add the feed from API and store.
- create user card and fill the info into user card.

# Deployment

- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "devTinder.pem" ubuntu@ec2-65-2-3-132.ap-south-1.compute.amazonaws.com
- sudo apt update
- sudo apt upgrade
- install node version 22.21
- git clone <repository>

## frontend-repository

- npm install
- npm run build
- sudo apt install nginx
- sudo systemctl status nginx
- sudo systemctl start nginx
- Copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/\* /var/www/html/
- copy the publicIp(from EC2 instance) and paste in google path search bar and enter
- Enable port 80 of your instance (this is listen by default port).

## backend-repository

- cd backend-repository
- npm install
- npm run dev
- add EC2 instance publicIp in Mongodb accessIp list allow to AWS-EC2 Ip.
- npm run dev
- check is frontend URL works ? (No because backend Port is not anabled in AWS EC2).
- go and enabled Port :7777(backend port) in security group -> add inbound rule in EC2.
- now search <EC2-IP>:7777/getUsers in any browser.
- npm install pm2 -g (Process Manager 27/7)
- pm2 list
- pm2 start npm -- start (using npm script) in (banckend directory)
- pm2 start npm --name devTinder -- start (using name) , pm2 start npm --name devTinder -- run dev
- pm2 logs
- pm2 delete <name>
- pm2 delete all
- pm2 flush
- pm2 flush <name>
- pm2 start npm --name devTinder -- run dev
- but frontend url is not get api response from backend.

- - frontend -> http://15.207.109.66/
- - backend -> http://15.207.109.66:7777/
- Domain Name = devtinder.com => 15.207.109.66
- - Frontend = devtinder.com
- - Backend = devtinder.com:7777 => devtinder.com/api

- So how do map this port 7777 numer to this path /api for that we will use nginx
- there something known as nginx proxy pass (map domain name)
- search to chatgpt -> nginx proxy pass /api to :7777 node application
- sudo nano /etc/nginx/sites-available/default

## Nginx-Config

```nginx
server {
    listen 80;
    server_name _; #(_ to replace EC2 Public Ip)

    root /var/www/html;
    index index.html;

    # Frontend (React / SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend (Node.js on 7777)
    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

- ctrl + x => y => enter
- sudo systemctl restart nginx
- you go any browser <publicIp>/api/
- Modify the BASE_URL in fronend project to "/api" and push the git hub and pull to EC2 server
- npm run build (in server)
- sudo cp -r dist/\* /var/www/html/

## Purchase A Domain

- purchase a domain from godaddy
- manage DNS
- Set DNS mapping for your domain name in their website.
- Using cloudfare to managing the DNS from godaddy
- In cloud fare search DNS record
- change the name server on godaddy and point at to cloudfare
- when the updating is success
- now cloudfare is manage domain name
- DNS record : A devtinder.in 43.204.96.49
- Enable SSL for website

# Adding a custom domain name

- Purchased a domain name from godaddy
- signup on cloudfare
- change the name servers on godaddy and point at to cludfare
- when the updating is success
- now cloudfare is manage domain name
- DNS record : A devtinder.in 43.204.96.49
- Enable SSL for website

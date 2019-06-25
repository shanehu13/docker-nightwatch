## Get started
### Install Docker  
To avoid problems on Windows use the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)  
For mac just [Install docker](https://docs.docker.com/install/)  

## Container Types  
Switch your docker into Linux containers  

### Automatic Boot Windows Only
(Windows) Open the Docker Quickstart Terminal  
- this will trigger the default docker boot

### Manual Boot
(Windows) Open Power Shell  
(MAC) Open Terminal  
Issue the following command to start the docker machine  
`docker-machine start default`  


## Resetting or installing a new instance of nightwatch nodes for Bruna.nl
By using powershell (Windows) or terminal (MAC)
Browse to the `{file system}/SSG-BrunaWebshop/automated-testing` folder  

Issue the command  
`npm install`  

Rename the .env.example to .env if you don't have a .env file
`mv env.example .env`  

Build the docker-compose image  
`docker-compose build`   

Start the docker nodes  
`docker-compose start`  

enter the docker bash
`docker-compose run --rm nightwatch`  

## Running Specific Tests

Run all tests on test env
`docker-compose run --rm nightwatch npm run e2e:test`  
Run part of the tests  
`docker-compose run --rm nightwatch npm run e2e:test -- --tag homepage --tag hero_image_banner`
Run tests on dev env
`docker-compose run --rm nightwatch npm run e2e:dev`
Generate report  
`docker-compose run --rm nightwatch npm run test:report'`

## Supervise with VNC  
download the VNC viewer on your machine https://www.realvnc.com/en/connect/download/viewer/  
open the VNC viewer after install  
input `{docker-machine-ip}:5900` in the search box and press enter  
input password `secret`  
click `ok` button  

## Known issues  
If you encounter `HTTP request took too long to complete` error, please restart your docker ([3106](https://github.com/docker/compose/issues/3106))  

## Broken docker machine  
If the docker machine is broken you can stop and restart the procedure  
Remove all existing nodes  
`docker-compose down --rmi 'all'`
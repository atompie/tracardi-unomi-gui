# Tracardi Unomi React GUI

![Screenshot 1](https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/176281298_116889430506445_8902050899484618905_n.png?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=qehNGVOamjoAX8JKEXJ&_nc_ht=scontent.fpoz4-1.fna&oh=9419256671a7058fac91911c447e73a5&oe=60ADAEC3)


# Installation

```
git clone https://github.com/atompie/tracardi-unomi-gui.git
```

Go to root directory ant build docker image

```
 docker build . -t tracardi-unomi-gui
```

It may take some time ~ 15min. 

Than run

```
docker-compose up
```

Or if you prefer to run it with docker

```
docker run -p 8787:80 -e API_URL=http://127.0.0.1:8686 tracardi-unomi-gui
```

It open pot 8787 on your localhost and connects to API at localhost: 8686.

Go to [https://github.com/atompie/tracardi](https://github.com/atompie/tracardi) for tracardi api. 
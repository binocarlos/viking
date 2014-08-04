FROM 		binocarlos/nodejs
MAINTAINER 	Kai Davenport <kaiyadavenport@gmail.com>

ADD . /srv/viking
RUN cd /srv/viking && npm install

WORKDIR /srv/viking
ENTRYPOINT ["node", "cli.js"]
CMD [""]
FROM debian
RUN mkdir /premier-docker
COPY dummy.txt /premier-docker/dummy.txt
RUN apt-get update -y
RUN apt-get install -y bastet
WORKDIR /premier-docker
RUN echo "Salut la famille" > dummy.txt 
CMD ["cat", "dummy.txt"]
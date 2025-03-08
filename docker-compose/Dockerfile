FROM debian:latest
WORKDIR /app
COPY ./index.html ./
COPY ./script.sh /script.sh
RUN chmod +x /script.sh

ENTRYPOINT [ "/bin/bash","/script.sh" ]
CMD ["./index.html"]
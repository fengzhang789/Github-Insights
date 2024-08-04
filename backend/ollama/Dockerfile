FROM ollama/ollama
COPY ./ollama-serve.sh /tmp/ollama-serve.sh

WORKDIR /tmp

RUN chmod +x ollama-serve.sh \
    && ./ollama-serve.sh

EXPOSE 11434
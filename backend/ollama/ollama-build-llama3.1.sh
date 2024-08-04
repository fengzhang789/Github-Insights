./bin/ollama serve &

pid=$!

sleep 5


echo "Pulling llama3.1 model"
ollama run llama3.1


wait $pid
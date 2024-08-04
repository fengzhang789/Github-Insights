.PHONY: start stop

start:
	docker-compose up -d
	npx prisma generate
	npx prisma migrate dev
	npm run start 

stop:
	docker-compose down


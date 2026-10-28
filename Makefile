# ---- Colors (ANSI escape codes) ----
RESET  = \033[0m
BOLD   = \033[1m
RED    = \033[31m
GREEN  = \033[32m
YELLOW = \033[33m
BLUE   = \033[34m
CYAN   = \033[36m


#detect available container tools
TOOL ?= $(shell command -v podman >/dev/null 2>&1 && echo "podman compose" || echo "docker compose")
	
COMPOSE_FILE=compose.yml
DEV_COMPOSE_FILE=dev/compose.yml

COMPOSE=$(TOOL) -f $(COMPOSE_FILE) -p transcendance_prod
COMPOSE_DEV=$(TOOL) -f $(DEV_COMPOSE_FILE) -p transcendance_dev

all: test_env
	@$(COMPOSE) up -d --build
	@printf "$(GREEN)🚀 Transcendance is running → $(BOLD)https://localhost:8443$(RESET)\n" 

dev: test_env
	@$(COMPOSE_DEV) up -d --build
	@printf "$(GREEN)🚀 Transcendance is running in dev mode → $(BOLD)http://localhost:5173$(RESET)\n"

dev-prisma:
	@if [ "$(name)" = "" ]; then \
		@printf "$(YELLOW)⚠️  No migration name provided, exiting$(RESET)\n"; \
		exit 1; \
	fi
	$(COMPOSE_DEV) exec backend npx prisma migrate dev --name $(name)
	@printf "$(GREEN)✅ prisma schema updated$(RESET)\n"@printf "$(GREEN)🚀 Transcendance backend is running in dev mode → $(BOLD)http://localhost:5173$(RESET)\n"

test_env:
	@printf "$(GREEN)\n=== CHECK ENV ===\n$(RESET)"
	@if [ -f .env ] ; then \
		printf "$(GREEN)✅ Environment file exists\n$(RESET)"; \
	else  \
		printf "$(RED)❌ Environment file is missing\n$(RESET)"; \
		exit 1; \
	fi

down:
	@$(COMPOSE) down
	@printf "$(YELLOW)🛑 Containers stopped (data kept)$(RESET)\n"
down-dev:
	@$(COMPOSE_DEV) down
	@printf "$(YELLOW)🛑 Containers dev stopped (data kept)$(RESET)\n"      

fclean:
	@$(COMPOSE) down -v --rmi local
	@printf "$(RED)🧹 Everything removed: containers, images, volumes$(RESET)\n" 
fclean-dev:
	@$(COMPOSE_DEV) down -v --rmi local
	@printf "$(RED)🧹 Everything dev removed: containers, images, volumes$(RESET)\n" 

re: fclean all
re-dev: fclean-dev dev

help:
	@printf "$(BOLD)$(CYAN)🧠 Transcendance — available commands$(RESET)\n\n"
	@printf "  $(GREEN)make$(RESET)         🚀 build and start the project\n"
	@printf "  $(GREEN)make dev$(RESET)     🚀 build and start the project in dev mode\n"
	@printf "  $(GREEN)make dev-prisma$(RESET)  🔄 🚀 create + apply a Prisma migration (name=…) — needs make dev running\n"
	@printf "  $(GREEN)make down$(RESET)    🛑 stop containers (keep data)\n"
	@printf "  $(GREEN)make down-dev$(RESET)  🛑 stop containers dev (keep data)\n"
	@printf "  $(GREEN)make fclean$(RESET)  🧹 remove containers, images and volumes\n"
	@printf "  $(GREEN)make fclean-dev$(RESET)  🧹 remove dev containers, images and volumes\n"
	@printf "  $(GREEN)make re$(RESET)      🔄 fclean + make\n"
	@printf "  $(GREEN)make re-dev$(RESET)   🔄 fclean-dev + make dev\n"
	@printf "  $(GREEN)make debug$(RESET)     🔍 status + last logs of each service\n"
	@printf "  $(GREEN)make debug-dev$(RESET)   🔍 status + last logs of each service\n"
	@printf "  $(GREEN)make logs$(RESET)    📜 follow all logs\n"
	@printf "  $(GREEN)make logs-dev$(RESET)    📜 follow all  dev logs\n"


debug:
	@printf "\n$(BOLD)$(BLUE)📦 CONTAINERS$(RESET)\n"
	@$(COMPOSE) ps
	@printf "\n$(BOLD)$(BLUE)🌐 LOGS FRONTEND$(RESET)\n"
	@$(COMPOSE) logs --tail=20 frontend
	@printf "\n$(BOLD)$(BLUE)🐘 LOGS DB$(RESET)\n"
	@$(COMPOSE) logs --tail=20 db
	@printf "\n$(BOLD)$(BLUE)🔎 LOGS BACKEND$(RESET)\n"
	@$(COMPOSE) logs --tail=20 backend

debug-dev:
	@printf "\n$(BOLD)$(BLUE)📦 CONTAINERS DEV$(RESET)\n"
	@$(COMPOSE_DEV) ps
	@printf "\n$(BOLD)$(BLUE)🌐 LOGS FRONTEND DEV$(RESET)\n"
	@$(COMPOSE_DEV) logs --tail=20 frontend
	@printf "\n$(BOLD)$(BLUE)🐘 LOGS DB DEV$(RESET)\n"
	@$(COMPOSE_DEV) logs --tail=20 db
	@printf "\n$(BOLD)$(BLUE)🔎 LOGS BACKEND DEV$(RESET)\n"
	@$(COMPOSE_DEV) logs --tail=20 backend
	
logs:
	@$(COMPOSE) logs -f
logs-dev:
	@$(COMPOSE_DEV) logs -f

logs-web:
	@$(COMPOSE) logs -f frontend
logs-web-dev:
	@$(COMPOSE_DEV) logs -f frontend
logs-db:
	@$(COMPOSE) logs -f db
logs-db-dev:
	@$(COMPOSE_DEV) logs -f db
logs-backend:
	@$(COMPOSE) logs -f backend
logs-backend-dev:
	@$(COMPOSE_DEV) logs -f backend

.PHONY: test_env all dev down down-dev fclean fclean-dev re re-dev  help debug logs logs-web logs-db logs-backend\
logs-web-dev logs-db-dev logs-backend-dev debug-dev logs-dev dev-prisma
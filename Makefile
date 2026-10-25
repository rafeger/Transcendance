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

COMPOSE=$(TOOL) -f $(COMPOSE_FILE) -p transcendance

all: test_env
	@$(COMPOSE) up -d --build
	@printf "$(GREEN)🚀 Transcendance is running → $(BOLD)https://localhost:8443$(RESET)\n" 

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

fclean:
	@$(COMPOSE) down -v --rmi local
	@printf "$(RED)🧹 Everything removed: containers, images, volumes$(RESET)\n" 

re: fclean all

help:
	@printf "$(BOLD)$(CYAN)🧠 Transcendance — available commands$(RESET)\n\n"
	@printf "  $(GREEN)make$(RESET)         🚀 build and start the project\n"
	@printf "  $(GREEN)make down$(RESET)    🛑 stop containers (keep data)\n"
	@printf "  $(GREEN)make fclean$(RESET)  🧹 remove containers, images and volumes\n"
	@printf "  $(GREEN)make re$(RESET)      🔄 fclean + make\n"
	@printf "  $(GREEN)make debug$(RESET)   🔍 status + last logs of each service\n"
	@printf "  $(GREEN)make logs$(RESET)    📜 follow all logs\n"


debug:
	@printf "\n$(BOLD)$(BLUE)📦 CONTAINERS$(RESET)\n"
	@$(COMPOSE) ps
	@printf "\n$(BOLD)$(BLUE)🌐 LOGS WEB$(RESET)\n"
	@$(COMPOSE) logs --tail=20 web
	@printf "\n$(BOLD)$(BLUE)🐘 LOGS DB$(RESET)\n"
	@$(COMPOSE) logs --tail=20 db
	@printf "\n$(BOLD)$(BLUE)🔎 LOGS BACKEND$(RESET)\n"
	@$(COMPOSE) logs --tail=20 backend
	
logs:
	@$(COMPOSE) logs -f

logs-web:
	@$(COMPOSE) logs -f web
logs-db:
	@$(COMPOSE) logs -f db
logs-backend:
	@$(COMPOSE) logs -f backend

.PHONY: test_env all down re fclean  help debug logs logs-web logs-db logs-check
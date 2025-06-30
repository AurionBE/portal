from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal, List, Optional
import random
import base64
from datetime import datetime
from pathlib import Path
import uvicorn

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

RANKS_DATA = [
	("lost", "Затерянный", 5),
	("extinguished", "Погасший", 10),
	("shadow_devourer", "Пожиратель теней", 15),
	("song_of_fading", "Песнь увядания", 20),
	("bloody_seer", "Кровавый провидец", 25),
	("abyss_chosen", "Избранный бездной", 30),
	("servant_of_death", "Слуга смерти", 35),
	("ruthless_overlord", "Безжалостный повелитель", 40),
	("child_of_chaos", "Дитя хаоса", 50),
	("entity_of_the_end", "Сущность конца", float("inf")),
]

GAME_MODES = ["ffa_classic", "ffa_nodebuff", "duel_classic", "duel_nodebuff"]
DUEL_RESULTS = ["victory", "defeat"]
FFA_RESULTS_PREFIX = "top_"

DEFAULT_SKIN_BASE64: Optional[str] = None

USERS = {
	"admin": {"password": "admin123", "id": 1, "elo": 9999},
	"test": {"password": "test123", "id": 2, "elo": 18},
	"aurion": {"password": "be", "id": 3, "elo": 33}
}

class LoginRequest(BaseModel):
	nickname: str
	password: str

class LoginResponse(BaseModel):
	token: str
	user_id: int

class ServerStatus(BaseModel):
	status: Literal["online", "offline", "attacked", "hard"]
	status_text: str
	online: int
	max_online: int
	last_update: datetime

class Stats(BaseModel):
	kills: int
	deaths: int
	wins: int
	losses: int

class CombatHistoryItem(BaseModel):
	id: int
	mode: Literal["ffa_classic", "ffa_nodebuff", "duel_classic", "duel_nodebuff"]
	result: str
	date: str

class ProfileData(BaseModel):
	nickname: str
	title: str
	rank_id: str
	rank_name: str
	elo: int
	stats_ffa: Stats
	stats_duels: Stats
	skin_base64: Optional[str]
	combat_history: List[CombatHistoryItem]

def get_rank_from_elo(elo: int):
	for rank_id, rank_name, max_elo in RANKS_DATA:
		if elo <= max_elo:
			return rank_id, rank_name
	return RANKS_DATA[0][0], RANKS_DATA[0][1]

@app.on_event("startup")
async def startup_event():
	global DEFAULT_SKIN_BASE64
	skin_path = Path("default.png")
	if skin_path.exists():
		with open(skin_path, "rb") as image_file:
			DEFAULT_SKIN_BASE64 = base64.b64encode(image_file.read()).decode("utf-8")

@app.post("/api/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
	user = USERS.get(request.nickname.lower())
	if not user or user["password"] != request.password:
		raise HTTPException(status_code=401, detail="Неверный логин или пароль")

	return LoginResponse(
		token=f"test_token_{random.randint(1000, 9999)}",
		user_id=user["id"]
	)

@app.get("/api/server/status", response_model=ServerStatus)
async def server_status():
	statuses = [
		("online", "Всё стабильно"),
		("offline", "Сервер не работает"),
		("attacked", "СЕРВЕР ПОД АТАКОЙ!"),
		("hard", "У сервера высокие нагрузки")
	]
	status, text = random.choice(statuses)

	return ServerStatus(
		status=status,
		status_text=text,
		online=random.randint(800, 1500),
		max_online=2000,
		last_update=datetime.now()
	)

@app.get("/api/profile/{nickname}", response_model=ProfileData)
async def get_profile(nickname: str):
	user_nickname = nickname.lower()
	if user_nickname not in USERS:
		raise HTTPException(status_code=404, detail="Игрок не найден")

	user = USERS[user_nickname]
	user_elo = user["elo"]
	rank_id, rank_name = get_rank_from_elo(user_elo)

	combat_history = []

	# for i in range(100):
	# 	mode = random.choice(GAME_MODES)
	# 	result = (random.choice(DUEL_RESULTS) if mode.startswith("duel")
	# 			else f"{FFA_RESULTS_PREFIX}{random.randint(1, 10)}")

	# 	combat_history.append(CombatHistoryItem(
	# 		id=i,
	# 		mode=mode,
	# 		result=result,
	# 		date=f"{random.randint(1, 28)}.06.2025"
	# 	))

	return ProfileData(
		nickname=nickname,
		title="Легенда Ариона",
		rank_id=rank_id,
		rank_name=rank_name,
		elo=user_elo,
		stats_ffa=Stats(
			kills=random.randint(100, 1000),
			deaths=random.randint(50, 500),
			wins=random.randint(20, 100),
			losses=random.randint(10, 80)
		),
		stats_duels=Stats(
			kills=random.randint(50, 300),
			deaths=random.randint(20, 150),
			wins=random.randint(50, 200),
			losses=random.randint(20, 100)
		),
		skin_base64=DEFAULT_SKIN_BASE64,
		combat_history=combat_history
	)

if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000)
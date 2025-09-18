from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from .db import Trade, get_session, create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This code runs on startup
    print("INFO:     Lifespan event: Creating database and tables.")
    create_db_and_tables()
    yield
    # This code runs on shutdown
    print("INFO:     Lifespan event: Application shutdown.")

app = FastAPI(lifespan=lifespan)

# CORS Middleware
origins = [
    "https://atjabu.netlify.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to create a new trade
@app.post("/trades/", response_model=Trade)
def create_trade(trade: Trade, session: Session = Depends(get_session)):
    session.add(trade)
    session.commit()
    session.refresh(trade)
    return trade

# Endpoint to get all trades
@app.get("/trades/", response_model=List[Trade])
def read_trades(session: Session = Depends(get_session)):
    trades = session.exec(select(Trade)).all()
    return trades

import os
from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel, create_engine, Session

# Define the Trade model
class Trade(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticker: str = Field(index=True)
    action: str  # "buy" or "sell"
    quantity: float
    price: float
    timestamp: datetime = Field(default_factory=datetime.utcnow, nullable=False)

# Get the database URL from the environment variable
DATABASE_URL = os.environ.get("DATABASE_URL")

# The engine will be None if the DATABASE_URL is not set.
# The application will fail at runtime if the engine is needed but not configured.
# This allows the module to be imported during tests without the env var.
engine = None
if DATABASE_URL:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Function to create the database and tables
def create_db_and_tables():
    if not engine:
        raise Exception("Cannot create tables, database engine is not initialized.")
    SQLModel.metadata.create_all(engine)

# Dependency to get a database session for API endpoints
def get_session():
    if not engine:
        raise Exception("Cannot get session, database engine is not initialized.")
    with Session(engine) as session:
        yield session

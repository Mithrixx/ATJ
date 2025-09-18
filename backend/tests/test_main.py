from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
from backend.main import app
from backend.db import get_session, Trade

def test_create_and_read_trade():
    # Use an in-memory SQLite database.
    # To avoid issues with in-memory DBs across threads, we create one connection
    # and use it for the whole test.
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False})
    connection = engine.connect()

    # Create tables on this specific connection
    SQLModel.metadata.create_all(connection)

    def get_session_override():
        # Each session will use the same single connection object
        with Session(connection) as session:
            yield session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)

    # Test POST endpoint
    response = client.post(
        "/trades/",
        json={"ticker": "TSLA", "action": "sell", "quantity": 50, "price": 200.0}
    )
    data = response.json()

    assert response.status_code == 200
    assert data["ticker"] == "TSLA"

    # Test GET endpoint
    response = client.get("/trades/")
    data = response.json()
    assert response.status_code == 200
    assert len(data) == 1
    assert data[0]["ticker"] == "TSLA"

    # Clean up
    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(connection)
    connection.close()

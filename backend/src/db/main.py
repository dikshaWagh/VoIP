from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine, async_sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from src.config import setting
from sqlmodel import SQLModel
from typing import AsyncGenerator

engine: AsyncEngine = create_async_engine(
    url=setting.DATABASE_URL,
    pool_size=100,           # Increased from default 5
    max_overflow=200,        # Allow temporary connections beyond pool_size
    pool_timeout=30,         # Wait longer for connections
    future=True
)

async_session = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,  # Specify the session class
    expire_on_commit=False
)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    print("Connecting...")
    async with async_session() as session:
        yield session
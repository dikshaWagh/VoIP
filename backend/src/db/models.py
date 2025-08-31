from sqlmodel import SQLModel, Field
from typing import Optional

class SIPPacket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    source_ip: str
    destination_ip: str
    method: str
    uri: str
    call_id: str
    content: str

class RTPPacket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    source_ip: str
    destination_ip: str
    payload_type: int
    sequence_number: int
    timestamp: int
    payload: bytes

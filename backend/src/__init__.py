from fastapi import FastAPI
from src.api import sip, rtp, sniffer
from contextlib import asynccontextmanager
from src.sniffer.sniffer import sniffer_instance

@asynccontextmanager
async def life_span(app: FastAPI):
    print("Server is starting...")
    sniffer_instance.start()
    yield
    sniffer_instance.stop()
    print("Server has been stopped.")

version = "v1"
app = FastAPI(
    title="VoIP Tracker",
    description="A REST API for VoIP tracking.",
    version=version,
    terms_of_service="",
    lifespan=life_span
)
app.include_router(sip.router, prefix=f"/api/{version}/sip", tags=['SIP'])
app.include_router(rtp.router, prefix=f"/api/{version}/rtp", tags=['RTP'])
app.include_router(sniffer.router, prefix=f"/api/{version}/sniffer", tags=['Sniffer'])
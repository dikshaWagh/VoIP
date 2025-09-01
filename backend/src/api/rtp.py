from fastapi import APIRouter
from src.sniffer.sniffer import sniffer_instance

router = APIRouter()

@router.get("/", response_model=list)
def get_rtp_packets():
    """
    Get all RTP packets since the last call.
    """
    return sniffer_instance.get_rtp_packets()

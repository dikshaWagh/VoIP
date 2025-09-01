from fastapi import APIRouter
from src.sniffer.sniffer import sniffer_instance

router = APIRouter()

@router.get("/", response_model=list)
def get_sip_packets():
    """
    Get all SIP packets since the last call.
    """
    return sniffer_instance.get_sip_packets()

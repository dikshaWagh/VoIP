from fastapi import APIRouter

router = APIRouter()

@router.get("/", response_model=list)
def get_rtp_packets():
    """
    Get all RTP packets. This endpoint currently returns an empty list.
    """
    return []

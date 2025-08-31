from fastapi import APIRouter

router = APIRouter()

@router.get("/", response_model=list)
def get_sip_packets():
    """
    Get all SIP packets. This endpoint currently returns an empty list.
    """
    return []

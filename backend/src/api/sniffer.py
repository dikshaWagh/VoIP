from fastapi import APIRouter, HTTPException, status
from src.sniffer.sniffer import sniffer_instance

router = APIRouter()

@router.post("/start")
def start_sniffer():
    """
    Start the packet sniffer.
    """
    try:
        sniffer_instance.start()
        return {"message": "Sniffer started successfully."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/stop")
def stop_sniffer():
    """
    Stop the packet sniffer.
    """
    try:
        sniffer_instance.stop()
        return {"message": "Sniffer stopped successfully."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

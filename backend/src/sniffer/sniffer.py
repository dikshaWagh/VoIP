import threading
from scapy.all import sniff
from scapy.layers.inet import IP, UDP
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Sniffer:
    def __init__(self):
        self.stop_sniffing = threading.Event()
        self.thread = None

    def process_packet(self, packet):
        try:
            if packet.haslayer(UDP) and (packet[UDP].sport == 5060 or packet[UDP].dport == 5060):
                self.process_sip_packet(packet)
            # A simple check for RTP packets (usually on even UDP ports)
            elif packet.haslayer(UDP) and packet[UDP].dport % 2 == 0 and packet[UDP].dport > 1024:
                 # Basic RTP header validation (version 2)
                payload = bytes(packet[UDP].payload)
                if len(payload) >= 12 and (payload[0] & 0xc0) == 0x80:
                    self.process_rtp_packet(packet)

        except Exception as e:
            logging.error(f"Error processing packet: {e}")

    def process_sip_packet(self, packet):
        try:
            # ye raw sip packet ka data extract kar reh hai (its using UDP layer payload)
            raw_sip = bytes(packet[UDP].payload)
            # sip data is encoded in utf8 format just simple decode kar reh hai
            sip_data = raw_sip.decode('utf-8', errors='ignore')
            
            method_line = sip_data.splitlines()[0]
            logging.info(f"SIP Packet: {method_line} from {packet[IP].src}:{packet[UDP].sport} to {packet[IP].dst}:{packet[UDP].dport}")
            logging.debug(sip_data)

        except Exception as e:
            logging.error(f"Error processing SIP packet: {e}")

    def process_rtp_packet(self, packet):
        try:
            payload = bytes(packet[UDP].payload)
            payload_type = payload[1] & 0x7F
            sequence_number = int.from_bytes(payload[2:4], 'big')
            timestamp = int.from_bytes(payload[4:8], 'big')
            
            logging.info(f"RTP Packet from {packet[IP].src}:{packet[UDP].sport} to {packet[IP].dst}:{packet[UDP].dport}, PT: {payload_type}, Seq: {sequence_number}, TS: {timestamp}")

        except Exception as e:
            logging.error(f"Error processing RTP packet: {e}")

    def start(self):
        if self.thread is not None and self.thread.is_alive():
            logging.warning("Sniffer is already running.")
            return
            
        self.stop_sniffing.clear()
        self.thread = threading.Thread(target=self._sniff_loop)
        self.thread.daemon = True
        self.thread.start()
        logging.info("Packet sniffer started.")

    def _sniff_loop(self):
        sniff(prn=self.process_packet, stop_filter=lambda p: self.stop_sniffing.is_set(), store=False)

    def stop(self):
        if self.thread is None or not self.thread.is_alive():
            logging.warning("Sniffer is not running.")
            return

        self.stop_sniffing.set()
        self.thread.join(timeout=5)
        if self.thread.is_alive():
            logging.error("Sniffer thread did not terminate gracefully.")
        else:
            logging.info("Packet sniffer stopped.")
        self.thread = None

sniffer_instance = Sniffer()

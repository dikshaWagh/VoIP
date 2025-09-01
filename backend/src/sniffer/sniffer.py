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
        # temp storage hai NOT PERSISTENT(DB engine use nahi karah hai)
        self.sip_packets = []
        self.rtp_packets = []
        # lock kara h to avoid race conditions while accessing packet lists
        self.lock = threading.Lock()

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
            if not packet.haslayer(UDP) or not packet.haslayer(IP):
                return

            sip_data = ""
            if packet.haslayer('Raw'):
                sip_data = packet['Raw'].load.decode('utf-8', errors='ignore')
            else:
                sip_data = bytes(packet[UDP].payload).decode('utf-8', errors='ignore')

            if not sip_data.strip():
                logging.warning("Received empty SIP data.")
                return

            lines = sip_data.splitlines()
            method_line = lines[0] if lines else "UNKNOWN"

            # Extract basic SIP headers
            headers = {}
            for line in lines[1:]:
                if ':' in line:
                    key, value = line.split(':', 1)
                    headers[key.strip()] = value.strip()

            packet_info = {
                "timestamp": packet.time,
                "method": method_line,
                "from_ip": packet[IP].src,
                "to_ip": packet[IP].dst,
                "from_port": packet[UDP].sport,
                "to_port": packet[UDP].dport,
                "ip_version": packet[IP].version,
                "ttl": packet[IP].ttl,
                "length": len(packet),
                "protocol": packet[IP].proto,
                "call_id": headers.get("Call-ID"),
                "cseq": headers.get("CSeq"),
                "from_header": headers.get("From"),
                "to_header": headers.get("To"),
                "via": headers.get("Via"),
                "contact": headers.get("Contact"),
                "sip_payload": sip_data
            }

            # Append safely using lock
            with self.lock:
                self.sip_packets.append(packet_info)

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
            
            packet_info = {
                "from_ip": packet[IP].src,
                "from_port": packet[UDP].sport,
                "to_ip": packet[IP].dst,
                "to_port": packet[UDP].dport,
                "payload_type": payload_type,
                "sequence_number": sequence_number,
                "timestamp": timestamp
            }

            with self.lock:
                self.rtp_packets.append(packet_info)
            
            logging.info(f"RTP Packet from {packet[IP].src}:{packet[UDP].sport} to {packet[IP].dst}:{packet[UDP].dport}, PT: {payload_type}, Seq: {sequence_number}, TS: {timestamp}")

        except Exception as e:
            logging.error(f"Error processing RTP packet: {e}")

    def get_sip_packets(self):
        with self.lock:
            packets = list(self.sip_packets)
            self.sip_packets.clear()
        return packets

    def get_rtp_packets(self):
        with self.lock:
            packets = list(self.rtp_packets)
            self.rtp_packets.clear()
        return packets

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
        while not self.stop_sniffing.is_set():
            sniff(prn=self.process_packet, stop_filter=lambda p: self.stop_sniffing.is_set(), store=False,timeout=1)

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

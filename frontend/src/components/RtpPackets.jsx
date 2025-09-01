import React, { useState, useEffect } from 'react';
import './RtpPackets.css';

const RtpPackets = () => {
    const [rtpPackets, setRtpPackets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRtpPackets = () => {
            fetch('http://127.0.0.1:8000/api/v1/rtp/')
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setRtpPackets(prevPackets => [...prevPackets, ...data]);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        };

        const interval = setInterval(fetchRtpPackets, 2000); // Fetch every 2 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading && rtpPackets.length === 0) {
        return <div>Loading RTP packets...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="rtp-packets-container">
            <h2>RTP Packet Details</h2>
            {rtpPackets.length === 0 ? (
                <p>No RTP packets captured yet.</p>
            ) : (
                <table className="rtp-packets-table">
                    <thead>
                        <tr>
                            <th>From IP</th>
                            <th>From Port</th>
                            <th>To IP</th>
                            <th>To Port</th>
                            <th>Payload Type</th>
                            <th>Sequence Number</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rtpPackets.map((packet, index) => (
                            <tr key={index}>
                                <td>{packet.from_ip}</td>
                                <td>{packet.from_port}</td>
                                <td>{packet.to_ip}</td>
                                <td>{packet.to_port}</td>
                                <td>{packet.payload_type}</td>
                                <td>{packet.sequence_number}</td>
                                <td>{packet.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RtpPackets;

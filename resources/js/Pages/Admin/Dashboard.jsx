import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import StatCard from '@/components/StatCard'
import AlertSuccess from '@/components/AlertSuccess'
import AlertError from '@/components/AlertError'

const Dashboard = () => {
    // State to handle form input
    const [qrCode, setQrCode] = useState('');
    const [entryType, setEntryType] = useState('Venue Entry');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const qrCodeInputRef = useRef(null);

    const [stats, setStats] = useState({
        attendees: 0,
        faculty: 0,
        delegates: 0,
        snacks: 0,
        lunch: 0,
        dinner: 0,
        kit: 0,
    });

    useEffect(() => {
        qrCodeInputRef.current.focus();
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/stats', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        const formattedTime = ($responseTime) => {
            const date = new Date($responseTime);
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true, // This ensures 12-hour format
            })
        };

        try {
            // Send data to the backend
            const response = await axios.post('/api/entries', {
                registration_code: qrCode,
                entry_type: entryType,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setError('');
            setQrCode('');
            setSuccess(response.data.success);
            setStatus('Name: ' + response.data.visitor.name + ', Entry Type: ' + Capitalize(response.data.entries.entry_type) + ', Time: ' + formattedTime(response.data.entries.entry_time));

            // Fetch updated stats after successful entry submission
            fetchStats();

            // Focus back on the QR Code input field after submitting
            qrCodeInputRef.current.focus();
        } catch (error) {
            setSuccess('');
            const response = error.response.data;
            if (response.error) {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setStatus('Name: ' + response.data[0].name + ', Entry Type: ' + Capitalize(response.data[0].entries[0].entry_type) + ', Time: ' + formattedTime(response.data[0].entries[0].entry_time))
                } else {
                    setStatus('')
                }
                setError(response.error);

            } else if (response.request) {
                setStatus('')
                setError(response.request);
            } else {
                setStatus('')
                setError(response.message);
            }

            // Focus back on the QR Code input field on error
            qrCodeInputRef.current.focus();
        }
    };

    return (
        <div className="lg:flex lg:min-h-screen">
            {/* Form Section */}
            <div className="form-section flex flex-col justify-center md:basis-[100%] lg:basis-[45%] p-4 lg:p-6 bg-gray-50">
                <div className="w-full flex justify-center items-center">
                    <div className="flex justify-center items-center w-36 h-36 bg-zinc-200 text-white rounded-full overflow-hidden">
                        <img src="/images/logo.jpeg" alt="MOBS Congress 2024" className="w-full h-full object-contain" />
                    </div>
                </div>

                <h1 className="flex justify-center my-4 text-xl font-bold text-sky-800">MOSB Congress 2024</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="input-group md:flex w-full">
                        <label htmlFor="qrCode" className="flex w-1/4 md:ml-6 items-center">Scan QR</label>
                        <input
                            type="text"
                            id="qrCode"
                            className="flex-grow text-right p-2 border border-gray-300 rounded-md"
                            ref={qrCodeInputRef}
                            value={qrCode}
                            onChange={(e) => setQrCode(e.target.value)}
                            placeholder="Enter QR code"
                        />
                    </div>
                    <div className="input-group w-full md:flex">
                        <label className="block md:inline-block w-1/4 md:ml-6 mb-2 md:mb-0">Entry Type</label>
                        <div className="entry-options flex flex-col md:flex-row w-full p-1 space-y-2 md:space-y-0 md:space-x-2">
                            {['venue_entry', 'snacks', 'lunch', 'dinner', 'kit'].map((type) => (
                                <label key={type} className="flex items-center">
                                    <input
                                        type="radio"
                                        value={type}
                                        checked={entryType === type}
                                        onChange={(e) => setEntryType(e.target.value)}
                                    />
                                    <span className="ml-1 capitalize">{type.replace('_', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="bg-sky-800 w-full p-2 text-white rounded-md hover:bg-sky-700">
                        Submit
                    </button>
                </form>

                {/* Error Handling */}
                {success && <div className="error-message text-green-500 pt-8"><AlertSuccess message={success} /><br /><div className='text-sky-800 text-center'>{status}</div></div>}
                {error && <div className="error-message text-red-500 pt-8"><AlertError message={error} /><br /><div className='text-sky-800 text-center'>{status}</div></div>}
            </div>


            {/* Stats Section */}
            <div className="stats-section flex flex-col justify-center lg:basis-[55%] bg-sky-800 p-4 lg:p-10 text-white">
                <h1 className="text-3xl font-normal pb-6">Congress statistics at a glance</h1>
                <div className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatCard label="# Attendees" value={stats.attendees} icon="👥" />
                    <StatCard label="# Faculty" value={stats.faculty} icon="👥" />
                    <StatCard label="# Delegates" value={stats.delegates} icon="👥" />
                    <StatCard label="# Snacks" value={stats.snacks} icon="🍴" />
                    <StatCard label="# Lunch" value={stats.lunch} icon="🍽️" />
                    <StatCard label="# Dinner" value={stats.dinner} icon="🍕" />
                    <StatCard label="# Kit" value={stats.kit} icon="📦" />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;

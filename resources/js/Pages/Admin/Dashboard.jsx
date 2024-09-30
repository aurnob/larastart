import { useState } from 'react';
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

    // Dummy statistics data (you can fetch real data from backend)
    const stats = {
        attendees: 14,
        faculty: 14,
        delegates: 14,
        snacks: 7,
        lunch: 4,
        dinner: 4,
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
            setQrCode('')
            setSuccess(response.data.success);
            setStatus('Name: ' + response.data.visitor.name + ', Entry Type: ' + Capitalize(response.data.entries.entry_type) + ', Time: ' + formattedTime(response.data.entries.entry_time))
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
        }
    };

    return (
        <div className="lg:flex">
            <div className="form-section md:basis-[100%] basis-[45%]">
                <div className="w-full flex justify-center items-center">
                    <div className="flex justify-center items-center w-36 h-36 bg-zinc-200 text-white rounded-full overflow-hidden">
                        <img src="/images/logo.png" alt="MOBS Congress 2024" className="w-full h-full object-contain" />
                    </div>
                </div>

                <h1 className="flex justify-center my-4 text-xl font-bold text-sky-800">MOSB Congress 2024</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group md:flex w-full">
                        <label htmlFor="qrCode" className="flex w-1/4 md:ml-6 items-center">Scan QR</label>
                        <input
                            type="text"
                            id="qrCode"
                            className="flex text-right"
                            value={qrCode}
                            onChange={(e) => setQrCode(e.target.value)}
                            placeholder="Enter QR code"
                        />
                    </div>
                    <div className="input-group md:flex w-full h-8">
                        <label className="flex w-1/4 md:ml-6 items-center">Entry Type</label>
                        <div className="entry-options flex w-full p-1">
                            <label>
                                <input
                                    type="radio"
                                    value="venue_entry"
                                    checked={entryType === 'venue_entry'}
                                    onChange={(e) => setEntryType(e.target.value)}
                                />
                                <span className="ml-1">Venue Entry</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="snacks"
                                    checked={entryType === 'snacks'}
                                    onChange={(e) => setEntryType(e.target.value)}
                                />
                                <span className="ml-1">Snacks</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="lunch"
                                    checked={entryType === 'lunch'}
                                    onChange={(e) => setEntryType(e.target.value)}
                                />
                                <span className="ml-1">Lunch</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="dinner"
                                    checked={entryType === 'dinner'}
                                    onChange={(e) => setEntryType(e.target.value)}
                                />
                                <span className="ml-1">Dinner</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="bg-sky-800 md:mt-0 mt-4">Submit</button>
                </form>

                {/* Error Handling */}
                {success && <div id="showSuccess" className="error-message text-green-500 pt-8"><AlertSuccess message={success} /><br /><div className='text-sky-800 text-center'>{status}</div></div>}
                {error && <div id="showError" className="error-message text-red-500 pt-8"><AlertError message={error} /><br /><div className='text-sky-800 text-center'>{status}</div></div>}
            </div>

            <div className="stats-section md:basis-[100%] basis-[55%] bg-sky-800 md:p-10 p-2">
                <h1 className="text-3xl font-normal text-white pb-6">Congress statistics at a glance</h1>
                <div className="stats-grid flex w-full">
                    <StatCard label="# Attendees" value={stats.attendees} icon="👥" className="w-1/3" />
                    <StatCard label="# Faculty" value={stats.faculty} icon="👥" className="w-1/3" />
                    <StatCard label="# Delegates" value={stats.delegates} icon="👥" className="w-1/3" />
                    <StatCard label="# Snacks" value={stats.snacks} icon="🍴" className="w-1/3" />
                    <StatCard label="# Lunch" value={stats.lunch} icon="🍽️" className="w-1/3" />
                    <StatCard label="# Dinner" value={stats.dinner} icon="🍕" className="w-1/3" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

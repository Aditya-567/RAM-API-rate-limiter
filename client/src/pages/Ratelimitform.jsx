import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RateLimitForm = () => {
    const [url, setUrl] = useState('');
    const [numRequests, setNumRequests] = useState(1);
    const [bestAlgorithm, setBestAlgorithm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timingData, setTimingData] = useState([]);
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setBestAlgorithm(null);
        setTimingData([]);

        const jsonPolicy = {
            function: 'Lambda1-RL',
            payload: {
                resource: 'test_endpoint',
                url: url,
                bucketsize: 10,
                refillrate: 5,
                ttl: 10,
                limit: 5,
                window_size_seconds: 60,
            }
        };

        let newResults = [];
        try {
            for (let i = 0; i < numRequests; i++) {
                const response = await axios.post(import.meta.env.VITE_API_URL_RATE_LIMITER, jsonPolicy, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Request Result:', response.data);
                newResults.push(response.data);
            }
            setResults(newResults);

            const timingResults = newResults.reduce((acc, result) => {
                if (result.bestAlgorithm === 'Lambda1-RL') acc['Token Bucket']++;
                if (result.bestAlgorithm === 'Lambda2-RL') acc['Fixed Window']++;
                if (result.bestAlgorithm === 'Lambda3-RL') acc['Sliding Window']++;
                if (result.bestAlgorithm === 'Lambda4-RL') acc['Step Ladder']++; // Add Lambda4-RL
                return acc;
            }, { 'Token Bucket': 0, 'Fixed Window': 0, 'Sliding Window': 0, 'Step Ladder': 0 }); // Include Step Ladder

            setBestAlgorithm(Object.keys(timingResults).reduce((a, b) => timingResults[a] > timingResults[b] ? a : b));

            setTimingData([
                { algorithm: 'Token Bucket', time: timingResults['Token Bucket'] },
                { algorithm: 'Fixed Window', time: timingResults['Fixed Window'] },
                { algorithm: 'Sliding Window', time: timingResults['Sliding Window'] },
                { algorithm: 'Step Ladder', time: timingResults['Step Ladder'] }, // Add Step Ladder to timingData
            ]);

        } catch (err) {
            console.error('Error sending request:', err);
            setError('An error occurred while sending the requests.');
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: timingData.map(data => data.algorithm),
        datasets: [{
            label: 'Count',
            data: timingData.map(data => data.time),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Comparison of Algorithm Timing',
            },
        },
    };

    return (
        <div style={{ width: '600px' }} className="mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-6">Rate Limiting Test</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: '16px' }}
                        placeholder='Enter the URL . . .'
                        required
                        className="mt-1 p-2 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numRequests" className="block text-sm font-medium text-gray-300" style={{ fontFamily: 'monospace' }}>Number of Requests:</label>
                    <input
                        type="number"
                        id="numRequests"
                        value={numRequests}
                        placeholder='Enter the number of requests'
                        onChange={(e) => setNumRequests(parseInt(e.target.value) || 1)}
                        required
                        style={{ fontFamily: 'monospace' }}
                        className="mt-1 p-2 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            {bestAlgorithm && (
                <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold">Best Algorithm:</h3>
                    <p className="text-lg">{bestAlgorithm}</p>
                </div>
            )}
            {timingData.length > 0 && (
                <div className="mt-8">
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default RateLimitForm;

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RateLimitForm = () => {
    const [url, setUrl] = useState('');
    const [bestAlgorithm, setBestAlgorithm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timingData, setTimingData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setBestAlgorithm(null);
        setTimingData([]);

        const jsonData = {
            payload: {
                resource: "test_endpoint",
                url: url,
                bucketsize: 10,
                refillrate: 5,
                ttl: 10,
                limit: 5,
                window_size_seconds: 10
            }
        };

        try {
            const res = await fetch('https://epzwixan13.execute-api.ap-south-1.amazonaws.com/prodcomp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            const result = await res.json();

            let algorithmName;
            switch (result.bestAlgorithm) {
                case 'Lambda1-RL':
                    algorithmName = 'Token Bucket';
                    break;
                case 'Lambda2-RL':
                    algorithmName = 'Fixed Window';
                    break;
                case 'Lambda3-RL':
                    algorithmName = 'Sliding Window';
                    break;
                default:
                    algorithmName = 'Unknown Algorithm';
            }

            setBestAlgorithm(algorithmName);
            setTimingData([
                { algorithm: 'Token Bucket', time: result.allResults['Lambda1-RL'].timeTaken },
                { algorithm: 'Fixed Window', time: result.allResults['Lambda2-RL'].timeTaken },
                { algorithm: 'Sliding Window', time: result.allResults['Lambda3-RL'].timeTaken },
            ]);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: timingData.map(data => data.algorithm),
        datasets: [
            {
                label: 'Time Taken (seconds)',
                data: timingData.map(data => data.time),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
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
        <div style={{ width: '600px' }} className=" mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-6">Rate Limiting Test</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">

                    <input
                        type="text"
                        id="url"
                        style={{ fontFamily: 'monospace', fontSize: '16px', }}
                        placeholder="Enter the URL . . ."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
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

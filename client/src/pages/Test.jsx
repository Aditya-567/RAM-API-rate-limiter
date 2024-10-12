import axios from 'axios';
import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    PieController,
    Tooltip
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import code from '../assets/code.png';
import map from '../assets/map.png';
import '../components/nav.css';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

const RateLimiterTester = () => {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <div>You must be logged in to access this page.</div>;
    }

    const [jsonPolicy, setJsonPolicy] = useState('');
    const [numRequests, setNumRequests] = useState(1);
    const [results, setResults] = useState([]);
    const [bestAlgorithm, setBestAlgorithm] = useState(null);
    const [loading, setLoading] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        const typed = new Typed('.role', {
            strings: ["JSON LAB "],
            typeSpeed: 200,
            backSpeed: 80,
            backDelay: 1000,
            loop: true,
            showCursor: false,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const sendRequests = async () => {
        setLoading(true);
        let newResults = [];
        try {
            for (let i = 0; i < numRequests; i++) {
                const response = await axios.post(import.meta.env.VITE_API_URL1, {
                    function: JSON.parse(jsonPolicy).function,
                    payload: JSON.parse(jsonPolicy).payload
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Request Result:', response.data);
                newResults.push(response.data);
            }
            setResults(newResults);

            // Compute best algorithm by comparing response time or other metrics
            const timingResults = newResults.reduce((acc, result) => {
                const functionName = result.bestAlgorithm || result.function;
                acc[functionName] = (acc[functionName] || 0) + 1;
                return acc;
            }, {});
            setBestAlgorithm(Object.keys(timingResults).reduce((a, b) => timingResults[a] > timingResults[b] ? a : b));

        } catch (error) {
            console.error('Error sending request:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('pie-chart').getContext('2d');
        chartRef.current = new ChartJS(ctx, {
            type: 'pie',
            data: {
                labels: ['Successful (200)', 'Rate Limited (429)', 'Other'],
                datasets: [{
                    data: results.reduce((acc, result) => {
                        if (result.statusCode === 200) acc[0]++;
                        else if (result.statusCode === 429) acc[1]++;
                        else acc[2]++;
                        return acc;
                    }, [0, 0, 0]),
                    backgroundColor: ['green', 'red', 'gray'],
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Digital-7 mono',
                                weight: 'bold'
                            },
                        },
                    },
                },
            },
        });
    }, [results]);

    // Predefined JSON templates for different Lambda functions
    const fillJsonPolicy1 = () => {
        setJsonPolicy(JSON.stringify({
            "function": "Lambda1-RL",
            "payload": {
                "resource": "MKResource",
                "url": "http://example.com",
                "bucketsize": 5,
                "refillrate": 1,
                "ttl": 10
            }
        }, null, 2));
    };

    const fillJsonPolicy2 = () => {
        setJsonPolicy(JSON.stringify({
            "function": "Lambda2-RL",
            "payload": {
                "resource": "MK2_resource",
                "url": "http://example.com",
                "limit": 5,
                "window_size_seconds": 30
            }
        }, null, 2));
    };

    const fillJsonPolicy3 = () => {
        setJsonPolicy(JSON.stringify({
            "function": "Lambda3-RL",
            "payload": {
                "resource": "MK3_resource",
                "url": "http://example.com",
                "limit": 3,
                "window_size_seconds": 10
            }
        }, null, 2));
    };

    const fillJsonPolicy4 = () => {
        setJsonPolicy(JSON.stringify({
            "function": "Lambda4-RL",
            "payload": {
                "resource": "StepLadder_resource",
                "url": "http://example.com",
                "bucketsize": 8,
                "refillrate": 2,
                "ttl": 15
            }
        }, null, 2));
    };

    return (
        <div className="mx-20 mt-32">
            <div className="flex pt-10 pl-10 gap-40">
                <div className="flex-1" style={{ position: 'relative' }}>
                    <img className="h-110 w-96" src={map} alt="code" style={{ position: 'relative', zIndex: 1, top: '-100px', left: '300px' }} />
                    <img id="bg5" className='absolute rounded-lg' src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzYzZGx5aWE2NDd3Ymg5YzIxYXczaW9sMnZyd2M2MnMxaGZiN3l5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGgsc5mWoryfgKBx1u/giphy.webp' width="500" height="480" title="API Gif" style={{ position: 'absolute', zIndex: 2, top: '0px', left: '0px' }}></img>
                    <img id="bg5" className="h-60 w-86 rounded-lg" src={code} alt="code" style={{ position: 'relative', zIndex: 4, top: '-150px', left: '400px' }} />
                </div>
                <div className='flex-1 pl-10'>
                    <h1 className='text-3xl font-bold pb-2'>Welcome to <span className="text-yellow-500 text-7xl font-bold role "> </span></h1>

                    <h1 className='text-2xl font-bold'>Explore and Test Your JSON Scripts with JSON LAB</h1>
                    <h1 className='text-lg' style={{ fontFamily: 'monospace', }}>Welcome to JSON LAB! Our advanced platform allows you to write,
                        test, and fine-tune your JSON scripts before integrating them
                        into your applications. JSON LAB provides an intuitive interface
                        designed to help you understand and optimize API rate limiter algorithms.</h1>
                    <h1 className='text-lg font-bold py-4'>With JSON LAB, you can:</h1>
                    <ul className='list-disc font-bold'>
                        <li><span className='text-yellow-500 font-bold '>Experiment Freely:</span> Write and modify JSON scripts in a safe environment without impacting live systems.</li>
                        <li><span className='text-yellow-500 font-bold'>Visualize Results:</span> Instantly see the effects of your JSON configurations with real-time visual tools like pie charts.</li>
                        <li><span className='text-yellow-500 font-bold'>Save and Share: </span> Save your scripts and collaborate with your team for efficient testing and review.</li>
                    </ul>
                    <h1 className='text-lg font-bold pt-4'> ⬅️ Like the image</h1>
                    <h1 className='text-lg font-bold' style={{ cursor: 'pointer' }} onClick={() => document.getElementById('pie').scrollIntoView({ behavior: 'smooth' })}>
                        ⬇️ the JSON editor is below <span className='text-blue-500'>click here !!! </span>⬇️
                    </h1>
                </div>
            </div>

            <div className="text-white flex mb-32 mx-20 gap-20">
                <div className="flex-1">
                    <h1 className='text-3xl font-bold pb-2'>JSON Editor . . .</h1>
                    <div className="flex gap-4 mb-4">
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={fillJsonPolicy1}>
                            Token Bucket
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={fillJsonPolicy2}>
                            Fixed Window
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={fillJsonPolicy3}>
                            Sliding Window
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={fillJsonPolicy4}>
                            Step Ladder
                        </button>
                    </div>
                    <label className="block mb-2">
                        <textarea className="w-full p-2 mt-1 text-black"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '16px',
                                height: '300px',
                                width: '630px',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px white',
                                background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)'
                            }}
                            rows="4"
                            placeholder="Enter JSON Policy here..."
                            value={jsonPolicy}
                            onChange={(e) => setJsonPolicy(e.target.value)} />
                    </label>
                    <div className="flex gap-4">
                        <label className="block mb-2">
                            <input className="w-full p-2 text-black"
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '16px',
                                    height: '60px',
                                    width: '242px',
                                    borderRadius: '10px',
                                    boxShadow: '1px 1px 5px white',
                                    background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)'
                                }}
                                type="number"
                                placeholder="Enter number of requests"
                                value={numRequests}
                                onChange={(e) => setNumRequests(parseInt(e.target.value) || 1)} />
                        </label>
                        <button className="p-2 cursor-pointer"
                            style={{
                                height: '60px',
                                width: '372px',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px blue',
                            }}
                            onClick={sendRequests}>Send Requests</button>
                    </div>
                </div>
                <div id='pie' className="flex-1 mb-32" style={{ height: '500px', width: '500px' }}>
                    <canvas id="pie-chart" height="450" width="450"></canvas>
                </div>
            </div>
        </div >
    );
};

export default RateLimiterTester;

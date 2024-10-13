import React from 'react';

const SummaryPage = () => {
    return (
        <div className="p-8 bg-transparent text-white" >
            <h2 className="text-center text-4xl font-bold mb-6">Lambda Function Payload Summary</h2>
            <p className="mb-4 text-center" style={{ fontFamily: 'monospace', fontSize: '16px' }}>Below is the summary of how each Lambda function uses the payload parameters:</p>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-700">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Field</th>
                            <th className="border border-gray-700 px-4 py-2">Description</th>
                            <th className="border border-gray-700 px-4 py-2">Used By</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontFamily: 'monospace', fontSize: '16px' }}>
                        <tr className="bg-gray-800 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">resource</td>
                            <td className="border border-gray-700 px-4 py-2">Identifier for the resource being rate-limited</td>
                            <td className="border border-gray-700 px-4 py-2">All Lambdas</td>
                        </tr>
                        <tr className="bg-gray-900 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">url</td>
                            <td className="border border-gray-700 px-4 py-2">The target URL where rate-limiting is applied</td>
                            <td className="border border-gray-700 px-4 py-2">All Lambdas</td>
                        </tr>
                        <tr className="bg-gray-800 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">bucketsize</td>
                            <td className="border border-gray-700 px-4 py-2">Maximum tokens in the bucket</td>
                            <td className="border border-gray-700 px-4 py-2">Lambda1-RL (Token Bucket)</td>
                        </tr>
                        <tr className="bg-gray-900 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">refillrate</td>
                            <td className="border border-gray-700 px-4 py-2">Rate at which tokens are refilled</td>
                            <td className="border border-gray-700 px-4 py-2">Lambda1-RL (Token Bucket)</td>
                        </tr>
                        <tr className="bg-gray-800 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">ttl</td>
                            <td className="border border-gray-700 px-4 py-2">Time-to-live for tokens in seconds</td>
                            <td className="border border-gray-700 px-4 py-2">Lambda1-RL (Token Bucket)</td>
                        </tr>
                        <tr className="bg-gray-900 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">limit</td>
                            <td className="border border-gray-700 px-4 py-2">Maximum requests allowed within the time window</td>
                            <td className="border border-gray-700 px-4 py-2">Lambda2-RL (Fixed Window), Lambda3-RL (Sliding Window)</td>
                        </tr>
                        <tr className="bg-gray-800 hover:bg-gray-700">
                            <td className="border border-gray-700 px-4 py-2">window_size_seconds</td>
                            <td className="border border-gray-700 px-4 py-2">Size of the time window in seconds</td>
                            <td className="border border-gray-700 px-4 py-2">Lambda2-RL (Fixed Window), Lambda3-RL (Sliding Window)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryPage;

import React from 'react';
import one from '../assets/1.png';
import two from '../assets/2.png';
import three from '../assets/3.png';
import four from '../assets/4.png';
import adi from '../assets/ADI.jpg';
import github from '../assets/github.png';
import home from '../assets/home.png';
import leetcode from '../assets/leetcode.png';
import linkedin from '../assets/linked.png';
import manav from '../assets/manav.jpg';
import rahul from '../assets/rahul.jpg';
import test from '../assets/test.png';
import twitter from '../assets/twitter.png';

const About = () => {

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };
    return <div>
        <div className='my-32 mx-20'>

            <div className="pt-10 flex gap-20">
                <div >
                    <img id="bg5" className='absolute rounded-lg' src={home} title="API Gif" style={{ position: 'relative', zIndex: 2, top: '0px', left: '0px', width: '650px', height: '350px' }}></img>
                    <img id="bg5" className="h-60 w-86 rounded-lg" src={test} alt="code" style={{ position: 'relative', zIndex: 4, top: '-100px', left: '250px' }} />
                </div>

                <div className='flex-1 pl-10'>
                    <h1 className='text-3xl font-bold pb-8'>Our RAM API Rate Limiter is Developer Friendly Website</h1>

                    <h1 className='text-lg mb-8' style={{ fontFamily: 'monospace', }}>RAM is a developer-centric API rate-limiting solution designed to manage API traffic effectively while preventing misuse. By implementing advanced rate-limiting algorithms like Token Bucket, Fixed Window, and Sliding Window, RAM ensures optimized performance and enhanced security for your APIs. With real-time control and monitoring capabilities, developers gain the flexibility to fine-tune request handling based on specific needs, ensuring robust API performance even under varying load conditions.

                    </h1>

                    <div className='flex gap-4 mb-10' style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                        <button onClick={() => scrollToSection('info')} className=' px-10 py-2 border-2 border-blue-500'>
                            Info
                        </button>
                        <button onClick={() => scrollToSection('devs')} className=' px-10 py-2 border-2 border-blue-500'>
                            Our Devs
                        </button>
                    </div>

                </div>

            </div>

            <div id='devs' className='pt-20 pb-40'>
                <h1 className='text-center text-6xl font-bold '>Our RAM Team</h1>
                <h1 className='text-center text-lg mb-16' style={{ fontFamily: 'monospace', }}>The team's dedication and collaboration have been instrumental in delivering a powerful <br />
                    solution for API management and performance optimization.</h1>
                <div className="flex flex-row gap-20 justify-center mb-20" style={{ fontFamily: 'monospace', }}>
                    <div id='bg7' className=' rounded-lg  px-6 py-6 '>
                        <div className='flex justify-center items-center mb-4'>
                            <img src={adi} className='rounded-lg' width="200" height="200" alt="Aditya Kumar" />
                        </div>
                        <div className='flex flex-col justify-center items-center mb-4'>
                            <h1 className='text-2xl font-bold' >Aditya Kumar</h1>
                            <p className='font-bold'>Web-Developer & Algorithms Expert</p>
                        </div>
                        <div className='flex flex-row gap-4 justify-center items-center'>
                            <a href="https://leetcode.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={leetcode} width="30" height="30" alt="Aditya Kumar LeetCode" />
                            </a>
                            <a href="https://twitter.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={twitter} width="30" height="30" alt="Aditya Kumar Twitter" />
                            </a>
                            <a href="https://linkedin.com/in/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} width="30" height="30" alt="Aditya Kumar LinkedIn" />
                            </a>
                            <a href="https://github.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={github} width="30" height="30" alt="Aditya Kumar GitHub" />
                            </a>
                        </div>
                    </div>
                    <div id='bg7' className=' rounded-lg px-6 py-6'>
                        <div className='flex justify-center items-center mb-4'>
                            <img src={rahul} className='rounded-lg' width="200" height="200" alt="rahul singh nagesh" />
                        </div>
                        <div className='flex flex-col justify-center items-center mb-4'>
                            <h1 className='text-2xl font-bold' >Rahul Singh Nagesh</h1>
                            <p className='font-bold'>Web-Developer & Algorithms Expert</p>
                        </div>
                        <div className='flex flex-row gap-4 justify-center items-center'>
                            <a href="https://leetcode.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={leetcode} width="30" height="30" alt="Aditya Kumar LeetCode" />
                            </a>
                            <a href="https://twitter.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={twitter} width="30" height="30" alt="Aditya Kumar Twitter" />
                            </a>
                            <a href="https://linkedin.com/in/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} width="30" height="30" alt="Aditya Kumar LinkedIn" />
                            </a>
                            <a href="https://github.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={github} width="30" height="30" alt="Aditya Kumar GitHub" />
                            </a>
                        </div>
                    </div>
                    <div id='bg7' className=' rounded-lg px-6 py-6'>
                        <div className='flex justify-center items-center mb-4'>
                            <img src={manav} className='rounded-lg' style={{ width: '200px', height: '200px' }} alt="manav khandurie" />
                        </div>
                        <div className='flex flex-col justify-center items-center mb-4'>
                            <h1 className='text-2xl font-bold' >Manav Khandurie</h1>
                            <p className='font-bold'>Web-Developer & Algorithms Expert</p>
                        </div>
                        <div className='flex flex-row gap-4 justify-center items-center'>
                            <a href="https://leetcode.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={leetcode} width="30" height="30" alt="Aditya Kumar LeetCode" />
                            </a>
                            <a href="https://twitter.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={twitter} width="30" height="30" alt="Aditya Kumar Twitter" />
                            </a>
                            <a href="https://linkedin.com/in/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} width="30" height="30" alt="Aditya Kumar LinkedIn" />
                            </a>
                            <a href="https://github.com/AdityaKumar" target="_blank" rel="noopener noreferrer">
                                <img src={github} width="30" height="30" alt="Aditya Kumar GitHub" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div id='info' className='flex flex-col justify-center items-center'>

                <h1 className='text-center text-6xl font-bold mb-16'>Know About RAM</h1>

                <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '100px', fontSize: '18px', fontFamily: 'monospace' }}>
                    <img src={one} alt="Logo" width={300} height={300} loading="lazy" />
                    <h3 >iToken Bucket: In this algorithm, there is a bucket that holds<br />
                        a certain number of tokens. Tokens are added to the bucket at a fixed<br />
                        rate. When a request arrives, it consumes a token from the bucket.<br />
                        If there are no tokens available, the request is either delayed or<br />
                        rejected. This algorithm allows bursts of traffic to be accommodated<br />
                        as long as there are tokens in the bucket.
                    </h3>
                </div>
                <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '100px', fontSize: '18px', fontFamily: 'monospace' }}>

                    <h3>Fixed Window: In this algorithm, a fixed window of time is defined <br />
                        (e.g., one second). Each time a request arrives, it increments a counter <br />
                        ssociated with that window. If the counter exceeds a predefined limit <br />
                        within the window, subsequent requests are either delayed or rejected until<br />
                        the window resets. This algorithm can lead to burstiness, as it doesn't<br />
                        smooth out traffic evenly.
                    </h3>
                    <img src={two} alt="Logo" width={300} height={300} loading="lazy" />
                </div>

                <div className='text-white pb-10' style={{ display: 'flex', alignItems: 'center', gap: '100px', fontSize: '18px', fontFamily: 'monospace' }}>
                    <img src={four} alt="Logo" width={300} height={300} loading="lazy" />
                    <h3 >Sliding Window: Similar to the fixed window, but instead of resetting<br />
                        the window at fixed intervals, the window slides continuously. Each request<br />
                        increments the counter for its respective window, and the system tracks<br />
                        the total count within a sliding time frame. If the total count exceeds<br />
                        the limit, further requests are delayed or rejected. This algorithm provides<br />
                        a smoother rate limiting mechanism compared to the fixed window, as it<br />
                        doesn't have abrupt resets.</h3>
                </div>
                <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '100px', fontSize: '18px', fontFamily: 'monospace' }}>

                    <h3>Lambda3-RL:<br />
                        "function":  Indicates that this configuration is for a rate limiter <br />
                        implementation named "Lambda3-RL".<br />
                        "payload": Contains parameters specific to this implementation.<br />
                        "resource":  Specifies the resource or endpoint being rate-limited.<br />
                        "url":  The URL associated with the resource.<br />
                        "limit":  Sets the limit for the maximum number of requests allowed<br />
                        within the specified window size.<br />
                        "window_size_seconds": Defines the size of the time window in seconds <br />
                        within which the specified limit applies.<br />
                    </h3>
                    <img src={three} alt="Logo" width={300} height={300} loading="lazy" />
                </div>

            </div>


        </div>
        <div className='flex justify-center items-center my-20'>
            <h1>@RAM 2024</h1>
        </div>
    </div>;
};

export default About;

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import GlassCard from '../components/GlassCard';
import { RefreshCw, CheckCircle, AlertTriangle, Trash2, X, Leaf, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeImage } from '../services/ai';
import { updateUserStats } from '../services/auth';

const Scan = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const processImage = useCallback(async (imageSrc) => {
        setProcessing(true);
        setError(null);
        try {
            const data = await analyzeImage(imageSrc);
            setResult(data);
            // Update User Stats
            updateUserStats(data.type, data.item, data.advice);
        } catch (err) {
            setError(err.message);
            setImgSrc(null); // Reset to camera on error
        } finally {
            setProcessing(false);
        }
    }, []);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
            processImage(imageSrc);
        }
    }, [processImage]);

    const reset = () => {
        setImgSrc(null);
        setResult(null);
        setError(null);
    };

    // Helper to get icon/color based on type
    const getResultStyles = (type) => {
        const t = type?.toLowerCase();
        if (t === 'recycle') return { icon: <RefreshCw size={32} />, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' };
        if (t === 'compost') return { icon: <Leaf size={32} />, color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500/10' };
        if (t === 'hazardous') return { icon: <AlertTriangle size={32} />, color: 'text-yellow-400', border: 'border-yellow-500', bg: 'bg-yellow-500/10' };
        return { icon: <Trash2 size={32} />, color: 'text-red-400', border: 'border-red-500', bg: 'bg-red-500/10' };
    };

    const styles = result ? getResultStyles(result.type) : {};

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 p-4">

            {/* Header */}
            <div className="w-full max-w-md mb-2 text-center">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">Sustain Scanner</h1>
            </div>

            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-black">
                {!imgSrc ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        videoConstraints={{ facingMode: "environment" }}
                    />
                ) : (
                    <img src={imgSrc} alt="captured" className="w-full h-full object-cover opacity-50" />
                )}

                {/* Overlay UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
                    {/* Scanner Frame */}
                    {!imgSrc && (
                        <div className="w-64 h-64 border-2 border-neon/50 rounded-xl mt-20 relative animate-pulse-slow">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-neon -mt-1 -ml-1" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-neon -mt-1 -mr-1" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-neon -mb-1 -ml-1" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-neon -mb-1 -mr-1" />
                        </div>
                    )}

                    {/* Result Card (Real AI Data) */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ y: 200, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 200, opacity: 0 }}
                                className={`absolute bottom-0 left-0 w-full bg-[#052e16] border-t-2 ${styles.border} rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-20 flex flex-col max-h-[80%] overflow-y-auto`}
                            >
                                <div className={`p-6 ${styles.bg}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-2xl bg-white/10 ${styles.color} backdrop-blur-md`}>
                                                {styles.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-3xl font-bold ${styles.color}`}>{result.type}</h3>
                                                <p className="text-white font-medium text-lg opacity-90">{result.item}</p>
                                            </div>
                                        </div>
                                        <button onClick={reset} className="p-2 bg-black/20 rounded-full hover:bg-black/40 backdrop-blur-md">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle size={16} className="text-neon" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Action</span>
                                        </div>
                                        <p className="text-white/90 text-sm leading-relaxed">{result.advice}</p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap size={16} className="text-indigo-400" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">AI Insight</span>
                                        </div>
                                        <p className="text-indigo-200 text-sm italic leading-relaxed">"{result.insight}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Toast */}
                    {error && (
                        <div className="absolute top-4 bg-red-500/90 text-white px-4 py-3 rounded-xl backdrop-blur-md border border-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {/* Controls */}
                    {!imgSrc && !processing && (
                        <button
                            onClick={capture}
                            className="w-20 h-20 rounded-full border-[6px] border-white/20 flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md active:scale-95 transition-all hover:border-neon/50"
                        >
                            <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                        </button>
                    )}
                </div>

                {/* Processing Overlay */}
                {processing && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-neon/30 rounded-full animate-ping" />
                            <div className="absolute inset-0 border-4 border-t-neon border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                            <div className="absolute inset-4 bg-neon/10 rounded-full blur-xl animate-pulse" />
                        </div>
                        <p className="text-neon font-bold tracking-[0.2em] text-sm animate-pulse">ANALYZING MOLECULES...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scan;

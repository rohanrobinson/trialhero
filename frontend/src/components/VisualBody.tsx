import { useState } from 'react';
import { searchClinicalTrials, type Study } from '../api/getClinicalTrial';
import TrialList from './TrialList';
import { Link } from 'react-router-dom';

const VisualBody = () => {
    const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
    const [trials, setTrials] = useState<Study[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const organs = [
        { id: 'brain', name: 'Brain', x: 150, y: 50, r: 35, color: '#FFB6C1' },
        { id: 'lungs', name: 'Lungs', x: 150, y: 130, r: 40, color: '#87CEEB' },
        { id: 'heart', name: 'Heart', x: 150, y: 130, r: 20, color: '#FF69B4' }, // Overlapping lungs slightly
        { id: 'liver', name: 'Liver', x: 130, y: 190, r: 25, color: '#CD853F' },
        { id: 'stomach', name: 'Stomach', x: 170, y: 190, r: 25, color: '#FFDAB9' },
        { id: 'kidneys', name: 'Kidneys', x: 150, y: 230, r: 20, color: '#DDA0DD' },
        { id: 'intestines', name: 'Intestines', x: 150, y: 280, r: 30, color: '#F0E68C' },
    ];

    const handleOrganClick = async (organName: string) => {
        setSelectedOrgan(organName);
        setLoading(true);
        setError(null);
        setTrials([]);

        try {
            const response = await searchClinicalTrials(organName, 5);
            setTrials(response.studies || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch trials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="visualBodyContainer" style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
            <div className="bodyView" style={{ flex: 1, textAlign: 'center' }}>
                <Link to="/" style={{ display: 'block', marginBottom: '1rem', color: '#646cff' }}>← Back to Search</Link>
                <h2>Interactive Body Search</h2>
                <p>Click on an organ to find related trials</p>

                <svg width="300" height="450" viewBox="0 0 300 450" style={{ border: '1px solid #333', borderRadius: '8px', background: '#222' }}>
                    {/* Silhouette with Head */}
                    <path d="M150,20 
                   Q185,20 185,55 
                   Q185,80 165,90 
                   L165,100 
                   Q210,100 230,130 
                   L230,250 
                   Q230,400 150,440 
                   Q70,400 70,250 
                   L70,130 
                   Q90,100 135,100 
                   L135,90 
                   Q115,80 115,55 
                   Q115,20 150,20 Z"
                        fill="#444" stroke="#666" strokeWidth="2" />

                    {/* Organs */}
                    {organs.map((organ) => (
                        <g key={organ.id}
                            onClick={() => handleOrganClick(organ.name)}
                            style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <circle cx={organ.x} cy={organ.y + 10} r={organ.r} fill={organ.color} />
                            <text x={organ.x} y={organ.y + 10} dy=".3em" textAnchor="middle" fontSize="10" fill="#000" style={{ pointerEvents: 'none' }}>
                                {organ.name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="resultsView" style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto' }}>
                {selectedOrgan && (
                    <>
                        <h3>Trials for: {selectedOrgan}</h3>
                        {loading && <p>Loading...</p>}
                        {error && <p className="error">{error}</p>}
                        {!loading && !error && trials.length === 0 && <p>No trials found.</p>}
                        {!loading && !error && trials.length > 0 && (
                            <TrialList trials={trials} lastQuery={selectedOrgan} />
                        )}
                    </>
                )}
                {!selectedOrgan && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                        <p>Select an organ to view trials</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisualBody;

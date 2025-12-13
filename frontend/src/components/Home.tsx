import { useState } from 'react';
import { searchClinicalTrials, type Study } from '../api/getClinicalTrial';
import TrialList from './TrialList';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [lastQuery, setLastQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [trials, setTrials] = useState<Study[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number | null>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setError('Please enter a search query');
            return;
        }

        setLoading(true);
        setError(null);
        setShowPopup(true);

        try {
            const response = await searchClinicalTrials(searchQuery, 5);
            setTrials(response.studies || []);
            setTotalCount(response.total_count || null);
            setLastQuery(searchQuery)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch trials');
            setTrials([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            {!lastQuery ? <h1>Trial Hero</h1> : <h3>Trial Hero</h3>}
            <div className="searchBarContainer">
                <input
                    type="text"
                    className="trialSearchBar"
                    placeholder="Research Clinical Trials"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                />
                <button
                    className="searchButton"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>

            </div>

÷

            {showPopup && (
                <div className="searchPopup">
                    {loading && <p>Loading trials...</p>}
                    {error && <p className="error">Error: {error}</p>}
                    {!loading && !error && trials.length === 0 && (
                        <p>No trials found. Try a different search term.</p>
                    )}
                    {!loading && !error && totalCount !== null && (
                        <p className="totalCount">Found {totalCount} trial(s)</p>
                    )}
                    {!loading && !error && trials.length > 0 && (
                        <TrialList trials={trials} lastQuery={lastQuery} />
                    )}
                </div>
            )}

        </div>
    );
};

export default Home;

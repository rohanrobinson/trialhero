import { useBookmarks } from '../hooks/useBookmarks';
import TrialList from './TrialList';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
    const { bookmarks } = useBookmarks();

    return (
        <div>
            <h1>My Bookmarks</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>
                    ← Back to Search
                </Link>
            </div>

            {bookmarks.length === 0 ? (
                <p>You haven't bookmarked any trials yet.</p>
            ) : (
                <TrialList trials={bookmarks} lastQuery="Bookmarks" />
            )}
        </div>
    );
};

export default Bookmarks;

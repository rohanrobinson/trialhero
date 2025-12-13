import { type Study } from '../api/getClinicalTrial';
import { useBookmarks } from '../hooks/useBookmarks';

interface TrialListProps {
    trials: Study[];
    lastQuery: string;
}

const TrialList = ({ trials, lastQuery }: TrialListProps) => {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

    const formatTrial = (study: Study) => {
        const protocol = study.protocolSection;
        const identification = protocol?.identificationModule;
        const status = protocol?.statusModule;
        const description = protocol?.descriptionModule;

        return {
            nctId: identification?.nctId || 'N/A',
            title: identification?.briefTitle || identification?.officialTitle || 'No title',
            status: status?.overallStatus || 'Unknown',
            startDate: status?.startDateStruct?.date || 'Unknown',
            summary: description?.briefSummary || 'No summary available',
        };
    };

    const handleBookmarkClick = (study: Study) => {
        const nctId = study.protocolSection?.identificationModule?.nctId;
        if (!nctId) return;

        if (isBookmarked(nctId)) {
            removeBookmark(nctId);
        } else {
            addBookmark(study);
        }
    };

    return (
        <>
            <h4 className="searchResultsHeader">Search Results: {lastQuery}</h4>
            <div className="trialsList">
                {trials.map((study) => {
                    const trial = formatTrial(study);
                    const bookmarked = isBookmarked(trial.nctId);

                    return (
                        <div key={trial.nctId} className="trialCard">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h3>{trial.title}</h3>
                                <button
                                    onClick={() => handleBookmarkClick(study)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.5rem',
                                        padding: '0 0 0 10px',
                                        color: bookmarked ? '#FFD700' : '#ccc'
                                    }}
                                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                                >
                                    {bookmarked ? '★' : '☆'}
                                </button>
                            </div>
                            <p className="trialId">
                                NCT ID: <a href={`https://clinicaltrials.gov/study/${trial.nctId}`} target="_blank" rel="noopener noreferrer" className="trialLink">{trial.nctId}</a>
                            </p>
                            <p className="trialStatus">Status: {trial.status}</p>
                            <p className="trialSummary">{trial.summary}</p>
                            <a href={`https://clinicaltrials.gov/study/${trial.nctId}`} target="_blank" rel="noopener noreferrer" className="viewTrialLink">View on ClinicalTrials.gov →</a>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TrialList;
